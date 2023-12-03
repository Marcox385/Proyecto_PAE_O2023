/**
 * Bugs Creators API
 * 
 * Post controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const msg = require('./../helpers/msg');

// Entity models
const model = require('./../models/post');

module.exports = {
    // GET
    getPosts: (req, res) => {
        const post_id = req.query.post_id;
        const title = req.query.title;
        const tags = req.query.tag;

        if (post_id || title || tags) {
            if (post_id) {
                model.findById(post_id).lean().then(response => {
                    if (response) return res.status(200).send(response);
                    res.status(404).send(msg('Post not found.'));
                });
                return;
            }

            const new_tags = (tags) ? ((Array.isArray(tags)) ? tags.join(' ') : tags) : '';
            const query = ((title) ? title: '') + ' ' + new_tags;
            
            model.aggregate([
                {
                    $search: {
                        index: "text_search",
                        text: {
                            query: query,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]).then(response => {
                posts = []
                response.forEach(post => posts.push(post));
                return res.status(200).send(posts);
            });
            return;
        }

        // Return all posts if id not passed
        model.find({}).lean().then(response => {
            posts = [];

            response.forEach(item => {
                const { _id, title, description, tags } = item;
                posts.push({_id, title, description, tags});
            });

            res.status(200).send(posts);
        });
    },

    getUserPosts: (req, res) => {
        const user_id = req.params.user_id || req.query.user_id || req.user.id;

        model.find({ user_id: user_id }).lean().then(response => {
            if (response) {
                posts = []
                response.forEach(post => posts.push(post));
                return res.status(200).send(posts);
            }

            return res.status(404).send(msg('User not found.'));
        });
    },

    // POST
    createPost: async (req, res) => {
        try {
            const user_id = req.user.id;
            const post_data = req.body;

            if (post_data) {
                // Ignore all other keys
                contents = {
                    user_id: user_id,
                    title: post_data.title,
                    description: post_data.description,
                    tags: post_data.tags.slice(0, 5),
                    notifyUser: post_data.notifyUser || false
                };

                const result = await model.create(contents);

                if (result) return res.status(201).send(result);
                return res.status(409).send(msg('Unable to create post.', 'Database returned no results.'));
            }

            res.status(400).send(msg('Post data not provided.'));
        } catch (error) {
            res.status(409).send(msg('Unable to create post.', error));
        }
    },

    // PUT
    editPost: async (req, res) => {
        const user_id = req.user.id;
        const post_id = req.body.post_id;
        const post_data = req.body.post_data;

        if (post_id) {
            if (post_data) {
                // Ignore all other keys
                newData = {
                    title: post_data.title,
                    description: post_data.description,
                    tags: post_data.tags
                };

                // Ignore null fields and return updated document after operation
                opts = { new: true, omitUndefined: true };
                doc = await model.findOneAndUpdate({ _id: post_id, user_id: user_id }, newData, opts);

                if (doc) {
                    res.status(200).send(doc);
                } else res.status(404).send(msg('Post not found or not owned by user.'));
                return;
            }

            return res.status(400).send(msg('Post data not provided.'));
        }

        res.status(400).send(msg('Post ID not provided.'));
    },

    // DELETE
    deletePost: (req, res) => {
        const user_id = req.user.id;
        const post_id = req.body.post_id;

        if (post_id) {
            model.findOneAndDelete({ _id: post_id, user_id: user_id }).lean().then(response => {
                if (response) {
                    return res.status(200).send(msg('Successfully deleted post.'));
                }
                
                res.status(404).send(msg('Post not found or not owned by user.'));
            });
            return;
        }

        res.status(400).send(msg('Post ID not provided.'));
    }
};

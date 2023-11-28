/**
 * Bugs Creators API
 * 
 * Post controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Entity model
const postModel = require('./../models/post');
const userModel = require('./../models/user');

module.exports = {
    // GET
    getPost: (req, res) => {
        post_id = req.query.post_id;

        if (post_id) {
            postModel.findOne({_id: post_id}).lean().then(response => {
                if (response) {
                    const { _id, title, description, labels } = response;
                    res.status(200).send({ _id, title, description, labels });
                } else {
                    res.status(404).send('Post not found.');
                }
            });
            return;
        }

        // Return all posts if id not passed
        postModel.find({}).lean().then(response => {
            posts = [];

            response.forEach(item => {
                const { _id, title, description, labels } = item;
                posts.push({_id, title, description, labels});
            });

            res.status(200).send(posts);
        });
    },

    getUserPosts: (req, res) => {
        const user_id = req.params.user_id || req.query.user_id;
        const username = req.query.username;
        const mail = req.query.mail;
        const phone = req.query.phone;

        if (user_id || username || mail || phone) {
            userModel.findOne({
                $or: [
                    { _id: user_id },
                    { username: username },
                    { mail: mail },
                    { phone: phone }
                ]
            }).lean().then(response => {
                if (response) { // User found in database
                    postModel.find({user_id: response._id}).lean().then(response => {
                        if (response) { 
                            posts = [];
        
                            response.forEach(post => 
                                posts.push({
                                    id: post._id,
                                    title: post.title,
                                    description: post.description,
                                    labels: post.labels
                                })
                            );
                            
                            res.status(200).send(posts);
                        }
                    });
                    return;
                }

                return res.status(404).send('User not found.');
            });
            return;
        }

        res.status(400).send('User data not provided.');
    },

    // POST
    createPost: (req, res) => {
        try {
            const user_id = req.body.user_id;
            const username = req.body.username;

            if (user_id || username) {
                userModel.findOne({
                    $or: [
                        { _id: user_id },
                        { username: username },
                    ]
                }).lean().then(async response => {
                    if (!response) return res.status(404).send('User not found.');

                    postData = req.body.postData;
                    if (postData) {
                        // Ignore all other keys
                        postData = {
                            user_id: response._id,
                            title: postData.title,
                            description: postData.description,
                            labels: postData.labels
                        };

                        const result = await postModel.create(postData);
                        return res.status(201).send({post_id: result._id});
                    }

                    res.status(400).send('Post data not provided.');
                });
                return;
            }

            return res.status(400).send('Username not provided.');
        } catch (error) {
            res.status(409).send('Unable to create post.');
        }
    },

    // PUT
    editPost: async (req, res) => {
        const post_id = req.body.post_id;
        const postData = req.body.postData;

        if (post_id) {
            if (postData) {
                // Ignore all other keys
                newData = {
                    title: postData.title,
                    description: postData.description,
                    labels: postData.labels
                };

                // Ignore null fields and return updated document after operation
                opts = { new: true, omitUndefined: true };
                doc = await postModel.findByIdAndUpdate(post_id, newData, opts);

                if (doc) {
                    res.status(200).send(doc);
                } else res.status(404).send(`Post not found.`);
                return;
            }

            return res.status(400).send(`Post data not provided.`);
        }

        res.status(400).send('Post ID not provided.');
    },

    // DELETE
    deletePost: (req, res) => {
        const post_id = req.body.post_id;

        if (post_id) {
            postModel.findByIdAndDelete(post_id).lean().then(response => {
                if (response) {
                    return res.status(200).send(`Successfully deleted post.`);    
                }
                
                res.status(404).send(`Post not found`);
            });
            return;
        }

        res.status(400).send('Post ID not provided.');
    }
};

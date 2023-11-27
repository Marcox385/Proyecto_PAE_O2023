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
        id = req.query.id;

        if (id) {
            postModel.findOne({_id: id}).lean().then(response => {
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

    // POST
    createPost: (req, res) => {
        try {
            const username = req.body.username;

            if (username) {
                userModel.findOne({username: username}).lean().then(response => {
                    if (!response) return res.status(404).send('User not found.');

                    postData = req.body.postData;
                    if (postData) {
                        // Ignore all other keys
                        postData = {
                            title: postData.title,
                            description: postData.description,
                            labels: postData.labels
                        };

                        const result = postModel.create(postData);
                        return res.status(201).send(`Post successfully registered.`);
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
        const postID = req.body.id;
        const postData = req.body.postData;

        if (postID) {
            if (postData) {
                // Ignore all other keys
                newData = {
                    title: postData.title,
                    description: postData.description,
                    labels: postData.labels
                };

                opts = { new: true }; // Return updated document after operation
                doc = await postModel.findOneAndUpdate({_id: postID}, newData, opts);

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
        const postID = req.body.id;

        if (postID) {
            postModel.findOneAndDelete({_id: postID}).lean().then(response => {
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

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
const model = require('./../models/user');

module.exports = {
    // GET
    getPost: (req, res) => {
        res.status(200).send('Post retrieval works!');
    },

    // POST
    createPost: (req, res) => {
        try {
            const postData = req.body;
            const result = true || model.create(postData);
            res.status(200).send('Post creation works!');
        } catch (error) {
            console.log('Error in post creation');
            console.log(error);
        }
    },

    // PUT
    editPost: (req, res) => {
        res.status(200).send('Post update works!');
    },

    // DELETE
    deletePost: (req, res) => {
        res.status(200).send('Post deletion works!');
    }
};

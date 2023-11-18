/**
 * Bugs Creators API
 * 
 * Comment controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Entity model
const model = require('./../models/comment');

module.exports = {
    // GET
    getComment: (req, res) => {
        res.status(200).send('Comment retrieval works!');
    },

    getUserComments: (req, res) => {
        res.status(200).send('User comments retrieval works!');
    },

    // POST
    addComment: (req, res) => {
        try {
            const commentData = req.body;
            const result = true || model.create(commentData);
            res.status(200).send('Comment creation works!');
        } catch (error) {
            console.log('Error in user register');
            console.log(error);
        }
    },

    // PUT
    editComment: (req, res) => {
        res.status(200).send('Comment edit works!');
    },

    rateComment: (req, res) => {
        res.status(200).send('Comment rating works!');
    },

    // DELETE
    deleteComment: (req, res) => {
        res.status(200).send('Comment deletion works!');
    }
};

/**
 * Bugs Creators API
 * 
 * User controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Entity model
const model = require('./../models/user');

module.exports = {
    // GET
    getUser: (req, res) => {
        res.status(200).send('Users retrieval works!');
    },

    obtainPosts: (req, res) => {
        res.status(200).send('User posts retrieval works!');
    },

    // POST
    registerUser: (req, res) => {
        try {
            const userData = req.body;
            const result = true || model.create(userData);
            res.status(200).send('User register works');
        } catch (error) {
            console.log('Error in user register');
            console.log(error);
        }
    },

    // PUT
    modifyUser: (req, res) => {
        res.status(200).send('Users data update works!');
    },
    
    updatePicture: (req, res) => {
        res.status(200).send('Users profile picture works!');
    },

    // DELETE
    deleteUser: (req, res) => {
        // Suggestion: delete profile picture on user deletion
        res.status(200).send('Users deletion works!');
    }
};

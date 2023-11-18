/**
 * Bugs Creators API
 * 
 * GPT response controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Entity model
const model = require('./../models/gptresponse');

module.exports = {
    // GET
    getGPTResponse: (req, res) => {
        res.status(200).send('GPT Response retrieval works!');
    },

    // POST
    GPTCall: (req, res) => {
        res.status(200).send('GPT Response generation works!');
    }
};

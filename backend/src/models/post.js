/**
 * Bugs Creators API
 * 
 * Post entity schema
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    labels: { type: Array, required: true },
    comments: { type: Array, default: [] },
    GPTResponses: { type: Array, default: [], validate: [GPTResponsesLimit, 'AI responses exceeded'] },
    notifyUser: { type: Boolean }
}, { timestamps: true });

function GPTResponsesLimit(arr) {
    return arr.length <= 8;
}

module.exports = model('post', postSchema);

// TODO: Transform ALL labels into lowercase: Javascript -> javascript

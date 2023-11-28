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
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    labels: { type: Array, default: [], validate: [LabelsLimit, 'Maximum labels exceeded']},
    GPTResponses: { type: Array, default: [], validate: [GPTResponsesLimit, 'AI responses exceeded'] },
    notifyUser: { type: Boolean, default: false }
}, { timestamps: true });
// Created and updated fields not required, as mongo adds them automatically

function GPTResponsesLimit(arr) {
    return arr.length <= 4;
}

function LabelsLimit(arr) {
    return arr.length <= 5;
}

module.exports = model('post', postSchema);

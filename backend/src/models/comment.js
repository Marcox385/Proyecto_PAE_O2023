/**
 * Bugs Creators API
 * 
 * Comment entity schema
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    user_id: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, default: 0 },
    rated_by: { type: Array, default: [] }
}, { timestamps: true });

module.exports = model('comment', commentSchema);

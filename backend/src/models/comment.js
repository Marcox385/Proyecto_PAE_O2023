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
    post_id: { type: String, required: true },
    user_id: { type: String, required: true },
    description: { type: String, required: true, maxLegth: 30000 },
    score: { type: Number, default: 0 },
    ratedBy : { type: Array, default: [] }
}, { timestamps: true });

module.exports = model('comment', commentSchema);

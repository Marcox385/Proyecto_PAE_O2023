/**
 * Bugs Creators API
 * 
 * GPTResponse entity schema
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const { Schema, model } = require('mongoose');

const gptResponseSchema = new Schema({
    contents: { type: String, required: true }
}, { timestamps: true });

module.exports = model('gptresponse', gptResponseSchema);

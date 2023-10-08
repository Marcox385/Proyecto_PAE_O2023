/**
 * Bugs Creators API
 * 
 * User entity schema
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    mail: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    username: { type: String },
    posts: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    ratedComments: { type: Array, default: [] }
}, { timestamps: true });

module.exports = model('user', userSchema);

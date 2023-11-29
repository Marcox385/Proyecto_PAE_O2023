/**
 * Bugs Creators API
 * 
 * Profile picture entity schema
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const { Schema, model } = require('mongoose');

const profilePictureSchema = new Schema({
    user_id: { type: String, required: true },
    ext: { type: String, required: true }
});

module.exports = model('profilePicture', profilePictureSchema);

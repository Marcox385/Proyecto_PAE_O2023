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

const refreshTokenSchema = new Schema({
    token: { type: String, required: true, maxLength: 512 }
});

module.exports = model('refreshToken', refreshTokenSchema);

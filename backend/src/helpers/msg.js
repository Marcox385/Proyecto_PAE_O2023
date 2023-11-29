/**
 * Bugs Creators API
 * 
 * Message helper for standard API responses
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

function msg(msg, err) {
    res = {message: msg}

    if (err) res.error = err

    return res
};

module.exports = msg;

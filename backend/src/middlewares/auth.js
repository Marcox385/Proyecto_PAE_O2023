/**
 * Bugs Creators API
 * 
 * Auth services middlewares
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

function authenticateToken(req, res, next) {
    const allowedRoutes = ['/users/register'];
    if (allowedRoutes.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err) return res.status(403).send('Invalid authorization token.');
            next();
        });
        return;
    }
    
    res.status(401).send('Missing authorization token.');
}

// Export functions
module.exports = {
    authenticateToken
};

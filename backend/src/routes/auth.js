/**
 * Bugs Creators API
 * 
 * Auth services
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Express router
const router = require('express').Router();

// Modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Entity model
const model = require('./../models/refreshToken');

// Load environment variables
dotenv.config();

// Routes
/**
 * @swagger
 * /auth:
 *  get:
 *   description: Auth entry point
 *   tags:
 *     - Auth
 *   responses:
 *     200:
 *       description: Auth working
 */
router.get('', (req, res) => {
    res.status(200).send('Auth services path normal');
});

/**
 * @swagger
 * /auth/login:
 *  post:
 *   description: Login for resource authorization
 *   tags:
 *     - Auth
 *   responses:
 *     200:
 *       description: Receive access and refresh tokens
 */
router.post('/login', (req, res) => {
    const { username, mail } = req.body;
    const user = { username, mail };

    // Generate access and refresh tokens for application accessing
    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_KEY, { expiresIn: '6d' });

    model.create({token: refreshToken}); // Store refresh token remotely

    res.status(200).send({accessToken, refreshToken});
});

/**
 * @swagger
 * /auth/token:
 *  post:
 *   description: Regenerate access token
 *   tags:
 *     - Auth
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user data
 *       schema:
 *         type: object
 *         properties:
 *           refreshToken:
 *             type: string
 *   responses:
 *     200:
 *       description: Receive new access token
 *     401:
 *       description: Refresh token not provided
 *     403:
 *       description: Invalid token
 */
router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken) {
        model.findOne({token: refreshToken}).lean().then(response => {
            if (response) {
                jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, data) => {
                    if (err) return res.status(403).send('Invalid token.');

                    const { username, mail } = data;
                    accessToken = jwt.sign({username, mail}, process.env.JWT_SECRET_KEY, { expiresIn: '15s' });
                    res.status(200).send({accessToken});
                });
            } else {
                res.status(403).send('Invalid token.');
            }
        });
        return;
    }

    res.status(401).send('Missing refresh token.');
});

/**
 * @swagger
 * /auth/token:
 *  post:
 *   description: Regenerate access token
 *   tags:
 *     - Auth
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user data
 *       schema:
 *         type: object
 *         properties:
 *           refreshToken:
 *             type: string
 *   responses:
 *     200:
 *       description: Refresh token invalidated in database
 *     404:
 *       description: Invalid refresh token
 *     503:
 *       description: Database error, unable to expire refresh token
 */
router.delete('/logout', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken) {
        model.findOneAndDelete({token: refreshToken}).lean().then(response => {
            if (response) {
                res.status(200).send('Token successfully deleted.');
            } else {
                res.status(404).send('Token not found. Proceed with caution.');
            }
        });
        return;
    }

    res.status(503).send('Unable to expire token. Proceed with caution.');
});

// Export router
module.exports = router;

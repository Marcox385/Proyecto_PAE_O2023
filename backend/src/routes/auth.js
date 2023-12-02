/**
 * Bugs Creators API
 * 
 * Auth services
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { getSocketInstance } = require('./../helpers/socket');
const msg = require('./../helpers/msg');

// User model as auth utility
const userModel = require('./../models/user');

// Express router
const router = require('express').Router();

// Entity model
const tokenModel = require('./../models/refreshToken');

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
    res.status(200).send(msg('Auth services path normal'));
});

/**
 * @swagger
 * /auth/login:
 *  post:
 *   description: Login for resource authorization
 *   tags:
 *     - Auth
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user credentials
 *       schema:
 *         type: object
 *         properties:
 *           mail:
 *             type: string
 *           phone:
 *             type: string
 *           password:
 *             type: string
 *             required: true
 *   responses:
 *     200:
 *       description: Receive access and refresh tokens
 *     401:
 *       description: Wrong user credentials
 *     503:
 *       description: Unable to login due to internal conflict
 */
router.post('/login', (req, res) => {
    // Get this data ideally from login form
    const { mail, phone, password } = req.body;
    const user = { mail, phone };
    const reqPassword = password;

    userModel.findOne({
        $or: [
            { mail: mail },
            { phone: phone }
        ]
    }).lean().then(response => {
        if (response) { // User exists in database (no need to check on later routes)
            // Check if password matches in database
            const { _id, username, password } = response;
            bcrypt.compare(reqPassword, password, function(err, data) {
                if (err) return res.status(503).send(msg('Unable to login'));

                if (data) {
                    // Generate access and refresh tokens for application accessing
                    user.id = _id;
                    user.username = username;

                    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_KEY, { expiresIn: '6d' });

                    tokenModel.create({token: refreshToken}); // Store refresh token remotely

                    res.status(200).send({accessToken, refreshToken});

                    // Join user notification socket room
                    const io = getSocketInstance();
                    io.to(_id).emit('joinRoom', _id);
                } else {
                    res.status(401).send(msg('Incorrect password'));
                }
                return;
            });
        } else { // User not registered
            res.status(401).send(msg('User not registered.'));
        }
        return;
    }).catch(err => {
        return res.status(503).send(msg('Unable to login', err));
    });
});

/**
 * @swagger
 * /auth/token:
 *  post:
 *   description: Regenerate access token. Required after user data updating.
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
        tokenModel.findOne({token: refreshToken}).lean().then(response => {
            if (response) { // Refresh token in database
                jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, data) => {
                    if (err) return res.status(403).send(msg('Invalid token.'));

                    const { id, username, mail, phone } = data;
                    const user = {id, username, mail, phone};
                    accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    res.status(200).send({accessToken});
                });
            } else {
                res.status(403).send(msg('Invalid token.'));
            }
        });
        return;
    }

    res.status(401).send(msg('Missing refresh token.'));
});

/**
 * @swagger
 * /auth/logout:
 *  post:
 *   description: Expire refresh token
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
        tokenModel.findOneAndDelete({token: refreshToken}).lean().then(response => {
            if (response) {
                res.status(200).send(msg('Token successfully deleted.'));
            } else {
                res.status(404).send(msg('Token not found. Proceed with caution.'));
            }
        });
        return;
    }

    res.status(503).send(msg('Unable to expire token. Proceed with caution.'));
});

// Export router
module.exports = router;

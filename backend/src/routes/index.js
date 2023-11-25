/**
 * Bugs Creators API
 * 
 * Entry point for routing
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const express = require('express');
const router = express.Router();

// Auths
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Local routes
const api = require('./api');

// Routes
/**
 * @swagger
 * /:
 *  get:
 *   description: initial global entry point
 *   tags:
 *     - Home
 *   responses:
 *     200:
 *       description: API verification route
 */
router.get('', (req, res) => {
    res.status(200).send('API is running');
});

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Signup succesful',
        user: req.user,
    })
})

router.post('login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || user) {
                const error = new Error('new Error')
                return next(error)
            }
            req.login(user, { session: false }, async (err) => {
                if (err) return next(err)
                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, 'top_secret')
                return res.json({ token })
            })
        } catch (e) {
            return next(e)
        }
    })(req, res, next)
})

router.get('profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
        message: 'Naiz',
        user: req.user,
        token: req.query.secret_token,
    })
})

router.use('', express.json()); // For possible JSON response correct rendering
router.use('/api', api);

// Export router
module.exports = router;

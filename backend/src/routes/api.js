/**
 * Bugs Creators API
 * 
 * API route manager
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const msg = require('./../helpers/msg');

// Express router
const router = require('express').Router();

// Local routes
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const gptresponses = require('./gptresponses');

// Routes
/**
 * @swagger
 * /api:
 *  get:
 *   description: API entry point
 *   tags:
 *     - API
 *   responses:
 *     200:
 *       description: API Entry verification path
 */
router.get('', (req, res) => {
    res.status(200).send(msg('API path normal'));
});

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/gptresponses', gptresponses);

// Export router
module.exports = router;

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
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Local files
const swaggerConfig = require('./../../swagger.config');

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
 *       description: API Entry endpoint
 */
router.get('', (req, res) => {
    res.status(200).send('API entry works!');
});

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/gptresponses', gptresponses);

// Swagger documentation endpoint
const swaggerDoc = swaggerJsDoc(swaggerConfig);
router.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Export router
module.exports = router;

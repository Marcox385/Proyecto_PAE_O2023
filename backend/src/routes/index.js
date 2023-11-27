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
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Swagger configuration file
const swaggerConfig = require('./../../swagger.config');

// Local routes
const api = require('./api');
const auth = require('./auth');

// Auth middlewares
const { authenticateToken } = require('../middlewares/auth');

// Routes
/**
 * @swagger
 * /:
 *  get:
 *   description: Initial global entry point
 *   tags:
 *     - Home
 *   responses:
 *     200:
 *       description: Backend verification route
 */
router.get('', (req, res) => {
    res.status(200).send('Backend server is running');
});

router.use('/auth', auth);
router.use('/api', authenticateToken, api);

// Swagger documentation endpoint
const swaggerDoc = swaggerJsDoc(swaggerConfig);
router.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Export router
module.exports = router;

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
 *       description: Home endpoint (further implementation)
 */
router.get('', (req, res) => {
    res.status(200).send('Entry point works!');
});

router.use('', express.json()); // For JSON response correct rendering
router.use('/api', api);

// Export  router
module.exports = router;

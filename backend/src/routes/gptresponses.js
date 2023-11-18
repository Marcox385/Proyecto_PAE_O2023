/**
 * Bugs Creators API
 * 
 * GPT Responses routes
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Express router
const router = require('express').Router();

// Controller
const controller = require('./../controllers/gptresponses.controller');

// Methods
/**
 * @swagger
 * /api/gptresponses:
 *  get:
 *   description: Get a single GPT response
 *   tags:
 *     - GPT Responses
 *   responses:
 *     200:
 *       description: Return GPT response
 * 
 *  post:
 *   description: Register a single GPT response
 *   tags:
 *     - GPT Responses
 *   responses:
 *     200:
 *       description: GPT response successfully registered
 */
router.get('', controller.getGPTResponse);
router.post('', controller.GPTCall);

// Export router
module.exports = router;

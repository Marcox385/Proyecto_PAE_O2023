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
 * /api/gptresponses/{post_id}:
 *  get:
 *   description: Get a single post GPT response
 *   tags:
 *     - GPT Responses
 *   parameters:
 *     - in: path
 *       name: post_id
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Return all GPT response
 *     400:
 *       description: Post id not provided
 *     404:
 *       description: Post not found or not owned by user
 */
router.get('/:post_id', controller.getGPTResponses);

/**
 * @swagger
 * /api/gptresponses/new:
 *  post:
 *   description: Register a single GPT response
 *   tags:
 *     - GPT Responses
 *   parameters:
 *     - in: body
 *       name: id
 *       description: post id
 *       schema:
 *         type: object
 *         properties:
 *           post_id:
 *             type: string
 *   responses:
 *     201:
 *       description: GPT response successfully registered
 *     400:
 *       description: Invalid post id
 *     403:
 *       description: GPT calls exceeded
 *     404:
 *       description: Post not found
 *     503:
 *       description: Unable to generate GPT answer
 */
router.post('/new', controller.GPTCall);

// Export router
module.exports = router;

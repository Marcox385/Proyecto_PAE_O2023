/**
 * Bugs Creators API
 * 
 * Post routes
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Express router
const router = require('express').Router();

// Controller
const controller = require('./../controllers/posts.controller');

// Methods
/**
 * @swagger
 * /api/posts:
 *  get:
 *   description: Get a single post
 *   tags:
 *     - Posts
 *   responses:
 *     200:
 *       description: Return specified post data
 * 
 *  post:
 *   description: Register a single post
 *   tags:
 *     - Posts
 *   responses:
 *     200:
 *       description: Post successfully created
 * 
 *  put:
 *   description: Update a single post
 *   tags:
 *     - Posts
 *   responses:
 *     200:
 *       description: Post successfully updated
 * 
 *  delete:
 *   description: Delete a single post
 *   tags:
 *     - Posts
 *   responses:
 *     200:
 *       description: Post successfully deleted
 */
router.get('', controller.getPost);
router.post('', controller.createPost);
router.put('', controller.editPost);
router.delete('', controller.deletePost);

// Export router
module.exports = router;

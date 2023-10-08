/**
 * Bugs Creators API
 * 
 * Comment routes
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Express router
const router = require('express').Router();

// Controller
const controller = require('./../controllers/comments.controller');

// Methods
/**
 * @swagger
 * /api/comments:
 *  get:
 *   description: Get a single comment
 *   tags:
 *     - Comments
 *   responses:
 *     200:
 *       description: Return specified comment data
 * 
 *  post:
 *   description: Register a single comment
 *   tags:
 *     - Comments
 *   responses:
 *     200:
 *       description: Post successfully created
 * 
 *  put:
 *   description: Update a single comment
 *   tags:
 *     - Comments
 *   responses:
 *     200:
 *       description: Post successfully updated
 * 
 *  delete:
 *   description: Delete a single comment
 *   tags:
 *     - Comments
 *   responses:
 *     200:
 *       description: Post successfully deleted
 * 
 * /api/comments/rate:
 *  put:
 *   description: Update comment rating
 *   tags:
 *     - Comments
 *   responses:
 *     200:
 *       description: Update comment rating
 */
router.get('', controller.getComment);
router.get('/user', controller.getUserComments);
router.post('', controller.addComment);
router.put('', controller.editComment);
router.put('/rate', controller.rateComment);
router.delete('', controller.deleteComment);

// Export router
module.exports = router;

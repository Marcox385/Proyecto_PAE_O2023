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
 *   description: Get comments
 *   tags:
 *     - Comments
 *   parameters:
 *     - in: query
 *       name: comment_id
 *       type: string
 *   responses:
 *     200:
 *       description: Return specified comment data
 *     400:
 *       description: Comment ID not provided
 *     404:
 *       description: Comment not found
 */
router.get('', controller.getComment);

/**
 * @swagger
 * /api/comments/new:
 *  post:
 *   description: Create a single comment
 *   tags:
 *     - Comments
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user and post id along with comment description
 *       schema:
 *         type: object
 *         properties:
 *           post_id:
 *             type: string
 *           description:
 *             type: string
 *   responses:
 *     201:
 *       description: Comment successfully created
 *     400:
 *       description: Post id or comment description not provided
 *     404:
 *       description: Post not found
 *     409:
 *       description: Unable to create comment
 */
router.post('/new', controller.createComment);

/**
 * @swagger
 * /api/comments/edit:
 *  put:
 *   description: Update a single comment
 *   tags:
 *     - Comments
 *   parameters:
 *     - in: body
 *       name: data
 *       description: comment id and new content
 *       schema:
 *         type: object
 *         properties:
 *           comment_id:
 *             type: string
 *           description:
 *             type: string
 *   responses:
 *     200:
 *       description: Post successfully updated
 *     400:
 *       description: Comment id or data not provided
 *     404:
 *       description: Comment not found or not owned by user
 */
router.put('/edit', controller.editComment);

/**
 * @swagger
 * /api/comments/rate:
 *  patch:
 *   description: Rate a comment
 *   tags:
 *     - Comments
 *   parameters:
 *     - in: body
 *       name: data
 *       description: comment id and new content
 *       schema:
 *         type: object
 *         properties:
 *           comment_id:
 *             type: string
 *           rate:
 *             type: integer
 *           remove:
 *             type: string
 *             optional: true
 *   responses:
 *     200:
 *       description: Comment rated
 *     204:
 *       description: Same comment rate
 *     400:
 *       description: Comment id not provided
 *     403:
 *       description: User tries to rate their own comment
 *     404:
 *       description: Comment not found
 *     422:
 *       description: Incorrect rate format
 */
router.patch('/rate', controller.rateComment);

/**
 * @swagger
 * /api/comments/delete:
 *  delete:
 *   description: Delete a single comment
 *   tags:
 *     - Comments
 *   schema:
 *     type: object
 *     properties:
 *       comment_id:
 *         type: string
 *   responses:
 *     200:
 *       description: Comment successfully deleted
 *     400:
 *       description: Comment ID not provided
 *     404:
 *       description: Comment not found or not owned by user
 */
router.delete('/delete', controller.deleteComment);

// Export router
module.exports = router;

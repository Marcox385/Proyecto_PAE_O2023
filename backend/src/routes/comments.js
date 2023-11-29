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
 *       description: Return specified comment data or all comments
 *     404:
 *       description: Comment not found
 */
router.get('', controller.getComment);

/**
 * @swagger
 * /api/comments/{user_id}:
 *  get:
 *   description: Get user's comments
 *   tags:
 *     - Comments
 *   parameters:
 *     - in: query
 *       name: user_id
 *       type: string
 *     - in: query
 *       name: username
 *       type: string
 *     - in: query
 *       name: mail
 *       type: string
 *     - in: query
 *       name: phone
 *       type: string
 *   responses:
 *     200:
 *       description: Get user's comments list
 *     400:
 *       description: User data not provided
 *     404:
 *       description: User not found
 */
router.get('/:user_id', controller.getUserComments);

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
 *           user_id:
 *             type: string
 *           post_id:
 *             type: string
 *           description:
 *             type: string
 *   responses:
 *     200:
 *       description: Post successfully created
 *     400:
 *       description: Required data not found (user or comment)
 *     404:
 *       description: Comment author user or post not found
 *     409:
 *       description: Can't create comment
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
 *       description: Comment not found
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
 *           user_id:
 *             type: string
 *           comment_id:
 *             type: string
 *           rate:
 *             type: integer
 *           remove:
 *             type: string
 *             optional: true
 *   responses:
 *     200:
 *       description: New comment rating
 *     204:
 *       description: Rate removed, updated, created or ignored
 *     400:
 *       description: User or comment id not provided
 *     403:
 *       description: User tries to rate their own comment
 *     404:
 *       description: User or comment not found
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
 *       description: Comment not found
 */
router.delete('/delete', controller.deleteComment);

// Export router
module.exports = router;

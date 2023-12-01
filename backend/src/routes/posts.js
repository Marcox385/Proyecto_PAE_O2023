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
 *   description: Search posts or get all
 *   tags:
 *     - Posts
 *   parameters:
 *     - in: query
 *       name: post_id
 *       type: string
 *       required: false
 *     - in: query
 *       name: title
 *       type: string
 *       require: false
 *     - in: query
 *       name: tag
 *       type: [string, array]
 *       require: false
 *   responses:
 *     200:
 *       description: Return specified post data or all posts
 *     404:
 *       description: Post not found
 */
router.get('', controller.getPosts);

/**
 * @swagger
 * /api/posts/user/{user_id}:
 *  get:
 *   description: Get all user posts
 *   tags:
 *     - Users
 *   parameters:
 *     - in: path
 *       name: user_id
 *       schema:
 *         type: string
 *       required: false
 *   responses:
 *     200:
 *       description: Get user post list
 *     404:
 *       description: User not found
 */
router.get('/user', controller.getUserPosts);
router.get('/user/:user_id', controller.getUserPosts);

/**
 * @swagger
 * /api/posts/new:
 *  post:
 *   description: Register a single post
 *   tags:
 *     - Posts
 *   schema:
 *     type: object
 *     properties:
 *       user_id:
 *         type: string
 *       username:
 *         type: string
 *       post_data:
 *         type: object
 *   responses:
 *     201:
 *       description: Post successfully created
 *     400:
 *       description: Post data not provided
 *     409:
 *       description: Unable to create post
 */
router.post('/new', controller.createPost);

/**
 * @swagger
 * /api/posts/edit:
 *  put:
 *   description: Update a single post
 *   tags:
 *     - Posts
 *   parameters:
 *     - in: body
 *       name: data
 *       description: username and new data
 *       schema:
 *         type: object
 *         properties:
 *           post_id:
 *             type: string
 *           post_data:
 *             type: object
 *   responses:
 *     200:
 *       description: Post successfully updated
 *     400:
 *       description: Post ID or data not provided
 *     404:
 *       description: Post not found or not owned by user
 */
router.put('/edit', controller.editPost);

/**
 * @swagger
 * /api/posts/delete:
 *  delete:
 *   description: Delete a single post
 *   tags:
 *     - Posts
 *   schema:
 *     type: object
 *     properties:
 *       post_id:
 *         type: string
 *   responses:
 *     200:
 *       description: Post successfully deleted
 *     400:
 *       description: Post ID not provided
 *     404:
 *       description: Post not found or not owned by user
 */
router.delete('/delete', controller.deletePost);

// Export router
module.exports = router;

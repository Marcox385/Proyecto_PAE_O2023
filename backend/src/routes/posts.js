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
 *   description: Get posts
 *   tags:
 *     - Posts
 *   parameters:
 *     - in: query
 *       name: id
 *       type: string
 *   responses:
 *     200:
 *       description: Return specified post data or all posts
 *     404:
 *       description: Post not found
 */
router.get('', controller.getPost);

/**
 * @swagger
 * /api/posts/{user_id}:
 *  get:
 *   description: Get user's posts
 *   tags:
 *     - Users
 *   parameters:
 *     - in: path
 *       name: user_id
 *       schema:
 *         type: string
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
 *       description: Get user's posts list
 *     400:
 *       description: User data not provided
 *     404:
 *       description: User not found
 */
router.get('/:user_id', controller.getUserPosts);

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
 *       postData:
 *         type: object
 *   responses:
 *     201:
 *       description: Post successfully created, id returned
 *     400:
 *       description: Username or post data not provided
 *     404:
 *       description: User to bind post not found
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
 *           postData:
 *             type: object
 *   responses:
 *     200:
 *       description: Post successfully updated
 *     400:
 *       description: Post ID or data not provided
 *     404:
 *       description: Post not found
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
 *       description: Post not found
 */
router.delete('/delete', controller.deletePost);

// Export router
module.exports = router;

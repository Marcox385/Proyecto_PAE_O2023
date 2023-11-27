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
 * /api/posts/new:
 *  post:
 *   description: Register a single post
 *   tags:
 *     - Posts
 *   responses:
 *     201:
 *       description: Post successfully created
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

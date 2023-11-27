/**
 * Bugs Creators API
 * 
 * User routes
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Express router
const router = require('express').Router();

// Controller
const controller = require('./../controllers/users.controller');

// Methods
/**
 * @swagger
 * /api/users:
 *  get:
 *   description: Get users
 *   tags:
 *     - Users
 *   parameters:
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
 *       description: Return a single user data or all if no parameters are passed
 *     404:
 *       description: User not found
 */
router.get('/', controller.getUser);

/**
 * @swagger
 * /api/users/posts:
 *  get:
 *   description: Get user's posts
 *   tags:
 *     - Users
 *   parameters:
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
router.get('/posts', controller.getUserPosts);

/**
 * @swagger
 * /api/users/comments:
 *  get:
 *   description: Get user's comments
 *   tags:
 *     - Users
 *   parameters:
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
router.get('/comments', controller.getUserComments);

/**
 * @swagger
 * /api/users/register:
 *  post:
 *   description: Register a single user
 *   tags:
 *     - Users
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user data
 *       schema:
 *         type: object
 *         properties:
 *           mail:
 *             type: string
 *           phone:
 *             type: string
 *           username:
 *             type: string
 *           password:
 *             type: string
 *   responses:
 *     200:
 *       description: User successfully created
 *     400:
 *       description: User data not provided
 *     409:
 *       description: User already exists or external error
 */
router.post('/register', controller.registerUser);

/**
 * @swagger
 * /api/users/modify:
 *  put:
 *   description: Update a single user
 *   tags:
 *     - Users
 *   parameters:
 *     - in: body
 *       name: data
 *       description: username and new data
 *       schema:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           data:
 *             type: object
 *   responses:
 *     200:
 *       description: User successfully updated
 *     400:
 *       description: Username or new data not provided
 *     404:
 *       description: User not found
 */
router.put('/modify', controller.modifyUser);

/**
 * @swagger
 * /api/users/delete:
 *  delete:
 *   description: Delete a single user
 *   tags:
 *     - Users
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user data
 *       schema:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           mail:
 *             type: string
 *           phone:
 *             type: string
 *   responses:
 *     200:
 *       description: User successfully deleted
 *     400:
 *       description: User data not provided
 *     404:
 *       description: User not found
 */
router.delete('/delete', controller.deleteUser);

/**
 * @swagger
 * /api/users/picture:
 *  get:
 *   description: Get user profile picture
 *   tags:
 *     - Users
 *   parameters:
 *     - in: query
 *       name: username
 *       type: string
 *   responses:
 *     200:
 *       description: Retrieve remotely stored user picture
 *  put:
 *   description: Update user profile picture
 *   tags:
 *     - Users
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user data
 *       schema:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *   responses:
 *     200:
 *       description: User profile picture successfully updated
 */
router.get('/picture', controller.getUserPicture);
router.put('/picture', controller.updateUserPicture);

// Export router
module.exports = router;

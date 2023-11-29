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

// Profile picture middleware
const profile_picture = require('./../middlewares/profile_picture');

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
 *       description: Return a single user data or all if no parameters are passed
 *     404:
 *       description: User not found
 */
router.get('/', controller.getUsers);

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
 *       description: User data not provided, missing mail and phone, or missing username
 *     409:
 *       description: User already exists or external error
 */
router.post('/register', controller.registerUser);

/**
 * @swagger
 * /api/users/picture:
 *  post:
 *   description: Upload user profile picture
 *   tags:
 *     - Users
 *   parameters:
 *     - in: body
 *       name: data
 *       description: user data
 *       schema:
 *         type: object
 *         properties:
 *           user_id:
 *             type: string
 *   responses:
 *     200:
 *       description: User profile picture successfully uploaded
 */
router.post('/picture', profile_picture.single('file'), controller.uploadUserPicture);

/**
 * @swagger
 * /api/users/modify:
 *  put:
 *   description: Update a single user (Doesn't handle same data from same user)
 *   tags:
 *     - Users
 *   parameters:
 *     - in: body
 *       name: data
 *       description: username and new data
 *       schema:
 *         type: object
 *         properties:
 *           user_id:
 *             type: string
 *           data:
 *             type: object
 *   responses:
 *     200:
 *       description: User successfully updated
 *     400:
 *       description: User id or new data not provided
 *     404:
 *       description: User not found
 *     409:
 *       description: New username, mail, or phone already in use
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
 *           user_id:
 *             type: string
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

// Export router
module.exports = router;

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
// TODO: Update swagger below for better readability
/**
 * @swagger
 * /api/users/{mail}:
 *  get:
 *   description: Get single user
 *   tags:
 *     - Users
 *   parameters:
 *     - in: path
 *       name: mail
 *       type: string
 *       required: true
 *   responses:
 *     200:
 *       description: Return a single user data given their mail
 *     400:
 *       description: Mail not provided
 *     404:
 *       description: User not found
 * 
 * /api/users:
 *  get:
 *   description: Get all users
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: Return all users (id, username, mail, and phone)
 * 
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
 * 
 * /api/users/modify/{mail}:
 *  put:
 *   description: Update a single user
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User successfully updated
 * 
 * /api/users/delete/{mail}:
 *  delete:
 *   description: Delete a single user
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User successfully deleted
 *   
 * /api/users/{mail}/posts:
 *  get:
 *   description: Get user's posts
 *   tags:
 *     - Users
 *   parameters:
 *     - in: path
 *       name: mail
 *       type: string
 *       required: true
 *   responses:
 *     200:
 *       description: Get user's posts list
 *     400:
 *       description: Mail not provided
 *     404:
 *       description: User no
 * 
 * /api/users/{mail}/picture:
 *  get:
 *   description: Get user profile picture
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: Retrieve remotely stored user picture
 *  put:
 *   description: Update user profile picture
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User profile picture successfully updated
 */
router.get('', controller.getAllUsers);
router.get('/:mail', controller.getUser);
router.get('/:mail/posts', controller.getUserPosts);
router.get('/:mail/picture', controller.getUserPicture);

router.post('/register', controller.registerUser);

router.put('/modify/:mail', controller.modifyUser);
router.put('/:mail/picture', controller.updateUserPicture);

router.delete('/delete/:mail', controller.deleteUser);

// Export router
module.exports = router;

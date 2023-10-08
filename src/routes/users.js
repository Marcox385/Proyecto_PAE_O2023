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
 * /api/users:
 *  get:
 *   description: Get a single user
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: Return specified user data
 * 
 *  post:
 *   description: Register a single user
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User successfully created
 * 
 *  put:
 *   description: Update a single user
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User successfully updated
 * 
 *  delete:
 *   description: Delete a single user
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User successfully deleted
 *   
 * /api/users/posts:
 *  get:
 *   description: Get user's posts
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: Get user's posts list
 * 
 * /api/users/picture:
 *  put:
 *   description: Update user profile picture
 *   tags:
 *     - Users
 *   responses:
 *     200:
 *       description: User profile picture successfully updated
 */
router.get('', controller.getUser);
router.get('/posts', controller.obtainPosts);
router.post('', controller.registerUser);
router.put('', controller.modifyUser);
router.put('/picture', controller.updatePicture);
router.delete('', controller.deleteUser);

// Export router
module.exports = router;

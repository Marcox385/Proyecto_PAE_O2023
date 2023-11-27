/**
 * Bugs Creators API
 * 
 * User controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Entity model
const model = require('./../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables for password salt

module.exports = {
    // GET
    getAllUsers: (req, res) => {
        model.find({}).lean().then(response => {
            users = [];

            response.forEach(item => {
                const { _id, username, mail, phone } = item;
                users.push({_id, username, mail, phone});
            });

            res.status(200).send(users);
        });
    },

    getUser: (req, res) => {
        mail = req.params.mail || false;

        if (mail) {
            model.findOne({
                $or: [
                    { username: userData.username },
                    { mail: userData.mail },
                    { phone: userData.phone }
                ]
            }).lean().then(response => {
                if (response) {
                    const { username, mail, phone } = response;
                    res.status(200).send({ username, mail, phone });
                } else {
                    res.status(404).send('User not found.');
                }
            });
            return;
        }

        res.status(400).send('Mail not provided!');
    },

    getUserPosts: (req, res) => {
        mail = req.params.mail || false;

        if (mail) {
            model.findOne({mail: mail}).lean().then(response => {
                if (response) {
                    const { posts } = response;
                    res.status(200).send(posts);
                } else {
                    res.status(404).send('User not found.');
                }
            });
            return;
        }

        res.status(400).send('Mail not provided!');
    },

    getUserPicture: (req, res) => { // TODO: Implement S3 uploading
        res.status(200).send('Image retrieval works');
    },

    // POST
    registerUser: (req, res) => {
        try {
            const userData = req.body;

            // Check if user already exists
            if (userData) {
                model.findOne({
                    $or: [
                        { username: userData.username },
                        { mail: userData.mail },
                        { phone: userData.phone }
                    ]
                }).lean().then(response => {
                    if (response) { // User already registered
                        res.status(409).send(`User "${userData.username}" already exists.`);
                    } else { // User not registered
                        const result = model.create(userData);
                        res.status(201).send(`User "${userData.username}" successfully registered.`);
                    }
                });

                return;
            }

            res.status(400).send('User data not provided.');
        } catch (error) {
            res.status(409).send('Unable to register user');
        }
    },

    // PUT
    modifyUser: async (req, res) => {
        mail = req.params.mail || false;

        if (mail) {
            update = req.body;

            if ("password" in update) { // Hash password before updating
                update.password = await bcrypt.hash(update.password, parseInt(process.env.SALT_ROUNDS, 10));
            }

            opts = { new: true }; // Return updated document after operation
            doc = await model.findOneAndUpdate({mail: mail}, update, opts);

            if (doc) {
                res.status(200).send(doc);
            } else res.status(400).send(`User with mail ${mail} not found`);
            return;
        }

        res.status(400).send('Mail not provided!');
    },
    
    updateUserPicture: (req, res) => { // TODO: Implement S3 updating
        res.status(200).send('Users profile picture works!');
    },

    // DELETE
    deleteUser: (req, res) => { // TODO: Delete image on S3 bucket
        // res.status(200).send('Users deletion works!');
        mail = req.params.mail || false;

        if (mail) {
            model.findOneAndDelete({mail: mail}).lean().then(response => {
                if (response) {
                    res.status(200).send(`Successfully deleted user with mail ${mail}`);    
                } else {
                    res.status(409).send(`User with mail ${mail} not found`);
                }
            });
            return;
        }

        res.status(400).send('Mail not provided!');
    }
};

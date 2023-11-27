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
    getUser: (req, res) => {
        username = req.query.username;
        mail = req.query.mail;
        phone = req.query.phone;

        if (username || mail || phone) {
            model.findOne({
                $or: [
                    { username: username },
                    { mail: mail },
                    { phone: phone }
                ]
            }).lean().then(response => {
                if (response) {
                    const { _id, username, mail, phone } = response;
                    res.status(200).send({ _id, username, mail, phone });
                } else {
                    res.status(404).send('User not found.');
                }
            });
            return;
        }

        // Return all users if parameters not passed
        model.find({}).lean().then(response => {
            users = [];

            response.forEach(item => {
                const { _id, username, mail, phone } = item;
                users.push({_id, username, mail, phone});
            });

            res.status(200).send(users);
        });
    },

    getUserPosts: (req, res) => {
        username = req.query.username;
        mail = req.query.mail;
        phone = req.query.phone;

        if (username || mail || phone) {
            model.findOne({
                $or: [
                    { username: username },
                    { mail: mail },
                    { phone: phone }
                ]
            }).lean().then(response => {
                if (response) {
                    const { posts } = response;
                    res.status(200).send(posts);
                } else {
                    res.status(404).send('User not found.');
                }
            });
            return;
        }

        res.status(400).send('User data not provided.');
    },

    getUserComments: (req, res) => {
        username = req.query.username;
        mail = req.query.mail;
        phone = req.query.phone;

        if (username || mail || phone) {
            model.findOne({
                $or: [
                    { username: username },
                    { mail: mail },
                    { phone: phone }
                ]
            }).lean().then(response => {
                if (response) {
                    const { comments } = response;
                    res.status(200).send(comments);
                } else {
                    res.status(404).send('User not found.');
                }
            });
            return;
        }

        res.status(400).send('User data not provided.');
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
                // Ignore all other keys
                userData = {
                    mail: userData.mail,
                    phone: userData.phone,
                    username: userData.username,
                    password: userData.password
                };

                model.findOne({
                    $or: [
                        { username: userData.username },
                        { mail: userData.mail },
                        { phone: userData.phone }
                    ]
                }).lean().then(response => {
                    if (response) { // User already registered
                        res.status(409).send(`User already exists.`);
                    } else { // User not registered
                        const result = model.create(userData);
                        res.status(201).send(`User successfully registered.`);
                    }
                });

                return;
            }

            res.status(400).send('User data not provided.');
        } catch (error) {
            res.status(409).send('Unable to register user.');
        }
    },

    // PUT
    modifyUser: async (req, res) => {
        username = req.body.username;

        if (username) {
            newData = req.body.data;

            if (newData) {
                // Extract relevant data
                newData = {
                    mail: newData.mail,
                    phone: newData.phone,
                    password: newData.password
                }; // Username update not allowed for now because of token regeneration need

                if (newData.password) // Hash password before updating
                    newData.password = await bcrypt.hash(newData.password, parseInt(process.env.SALT_ROUNDS, 10));
                
                opts = { new: true }; // Return updated document after operation
                doc = await model.findOneAndUpdate({username: username}, newData, opts);

                if (doc) {
                    res.status(200).send(doc);
                } else res.status(404).send(`User not found.`);
                return;
            }

            return res.status(400).send('New data not provided.');
        }

        res.status(400).send('Username not provided.');
    },
    
    updateUserPicture: (req, res) => { // TODO: Implement S3 updating
        res.status(200).send('Users profile picture works!');
    },

    // DELETE
    deleteUser: (req, res) => { // TODO: Delete image on S3 bucket
        username = req.body.username;
        mail = req.body.mail;
        phone = req.body.phone;

        if (username || mail || phone) {
            model.findOneAndDelete({
                $or: [
                    { username: username },
                    { mail: mail },
                    { phone: phone }
                ]
            }).lean().then(response => {
                if (response) {
                    return res.status(200).send(`Successfully deleted user.`);    
                }
                
                res.status(404).send(`User not found`);
            });
            return;
        }

        res.status(400).send('User data not provided.');
    }
};

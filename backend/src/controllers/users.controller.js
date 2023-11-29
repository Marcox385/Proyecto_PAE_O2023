/**
 * Bugs Creators API
 * 
 * User controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Entity model
const model = require('./../models/user');

dotenv.config(); // Load environment variables for password salt

module.exports = {
    // GET
    getUser: (req, res) => {
        const user_id = req.query.user_id;
        const username = req.query.username;
        const mail = req.query.mail;
        const phone = req.query.phone;

        if (user_id || username || mail || phone) {
            model.findOne({
                $or: [
                    { _id: user_id },
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

    getUserComments: (req, res) => { // TODO: Move to comments controller
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
                if (!userData.mail && !userData.phone)
                    return res.status(400).send('Provide at least mail or phone.');

                if (!userData.username)
                    return res.status(400).send('Username not provided.');

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
                        // Ignore all other keys
                        const newUserData = {
                            mail: userData.mail,
                            phone: userData.phone,
                            username: userData.username,
                            password: userData.password
                        };

                        const result = model.create(newUserData);
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
    modifyUser: (req, res) => {
        /**
         *  NOTE: Method doesn't handle same data for same user case.
         *        Handle from frontend form directly
         */

        const user_id = req.body.user_id;

        if (user_id) {
            newData = req.body.data;

            if (newData) {
                // Extract relevant data
                newData = {
                    mail: newData.mail,
                    phone: newData.phone,
                    username: newData.username,
                    password: newData.password
                };

                model.findOne({
                    $or: [
                        { mail: newData.mail },
                        { phone: newData.phone },
                        { username: newData.username },
                    ]
                }).lean().then(async response => {
                    // User new data conflicts with db
                    if (response) {
                        dataInUse = {};

                        if (response.mail) dataInUse.mail = true;
                        if (response.phone) dataInUse.phone = true;
                        if (response.username) dataInUse.username = true;

                        return res.status(409).send(dataInUse);
                    }

                    if (newData.password) // Hash password before updating
                        newData.password = await bcrypt.hash(newData.password, parseInt(process.env.SALT_ROUNDS, 10));
                    
                    // Ignore null fields and return updated document after operation
                    opts = { new: true, omitUndefined: true };
                    doc = await model.findByIdAndUpdate(user_id, newData, opts);

                    if (doc) {
                        res.status(200).send(doc);
                    } else res.status(404).send(`User not found.`);
                });
                return;
            }

            return res.status(400).send('New data not provided.');
        }

        res.status(400).send('User id not provided.');
    },
    
    updateUserPicture: (req, res) => { // TODO: Implement S3 updating
        res.status(200).send('Users profile picture works!');
    },

    // DELETE
    deleteUser: (req, res) => { // TODO: Delete image on S3 bucket
        const user_id = req.body.user_id;
        const username = req.body.username;
        const mail = req.body.mail;
        const phone = req.body.phone;

        if (user_id || username || mail || phone) {
            model.findOneAndDelete({
                $or: [
                    { _id: user_id },
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

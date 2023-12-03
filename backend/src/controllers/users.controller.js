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
const fs = require('fs');
const path = require('path');
const msg = require('./../helpers/msg');

// Entity models
const userModel = require('./../models/user');
const pictureModel = require('./../models/profilePicture');

dotenv.config(); // Load environment variables for password salt

module.exports = {
    // GET
    getUsers: (req, res) => {
        const user_id = req.user.id || req.query.id;
        const username = req.query.username;
        const mail = req.query.mail;
        const phone = req.query.phone;

        if (user_id || username || mail || phone) {
            userModel.findOne({
                $or: [
                    { _id: user_id },
                    { username: username },
                    { mail: mail },
                    { phone: phone }
                ]
            }).lean().then(response => {
                if (response) {
                    const { username, mail, phone } = response;
                    res.status(200).send({ username, mail, phone });
                } else {
                    res.status(404).send(msg('User not found.'));
                }
            });
            return;
        }

        // Return all users if parameters not passed
        userModel.find({}).lean().then(response => {
            users = [];

            response.forEach(item => {
                const { username, mail, phone } = item;
                users.push({username, mail, phone});
            });

            res.status(200).send(users);
        });
    },
    
    // POST
    registerUser: (req, res) => {
        try {
            const userData = req.body;

            // Check if user already exists
            if (userData) {
                if (!userData.username)
                    return res.status(400).send(msg('Username not provided.'));

                if (!userData.mail && !userData.phone)
                    return res.status(400).send(msg('Provide at least mail or phone.'));

                userModel.findOne({
                    $or: [
                        { username: userData.username },
                        { mail: userData.mail },
                        { phone: userData.phone }
                    ]
                }).lean().then(response => {
                    if (response) { // User already registered
                        res.status(409).send(msg('User already exists.'));
                    } else { // User not registered
                        // Ignore all other keys
                        const newUserData = {
                            mail: userData.mail,
                            phone: userData.phone,
                            username: userData.username,
                            password: userData.password // Hashed in userModel
                        };

                        const result = userModel.create(newUserData);

                        if (result) return res.status(201).send(msg('User successfully registered.'));
                        return res.status(409).send(msg('Unable to register user.'));
                    }
                });

                return;
            }

            res.status(400).send(msg('User data not provided.'));
        } catch (error) {
            res.status(409).send(msg('Unable to register user.'));
        }
    },

    uploadUserPicture: (req, res) => {
        const user_id = req.user.id;
        const file = req.file;

        // Picture extension not valid
        if (!file)
            return res.status(422).send(msg('Image type not supported.'));
        
        const ext = file.originalname.split('.').pop();
        pictureModel.findOneAndUpdate(
            { user_id: user_id },
            { ext: ext },
            { upsert: true }
        ).then(response => {
            // Delete previous image if new image extension is different
            if (response.ext !== ext) {
                const uri = path.join(__dirname, '..', '..', 'imgs', user_id + '.' + response.ext);
                fs.unlinkSync(uri);
            }

            res.status(201).send(msg('Image uploaded successfully.'));
        }).catch(err => {
            const uri = path.join(__dirname, '..', '..', 'imgs', req.file.filename);
            fs.unlinkSync(uri); // Delete local image file
            res.status(400).send(msg('Error on image upload', err));
        });
    },

    // PUT
    modifyUser: (req, res) => {
        /**
         *  NOTE: Method doesn't handle unmodified user data
         *        Handle from frontend form directly
         *        (Will throw an error otherwise)
         */

        const user_id = req.user.id;

        if (user_id) {
            data = req.body;

            if (data) {
                // Extract relevant data
                const newData = {
                    mail: data.mail,
                    phone: data.phone,
                    username: data.username,
                    password: data.password
                };

                // Check if new data is already on db
                userModel.findOne({
                    $or: [
                        { mail: newData.mail },
                        { phone: newData.phone },
                        { username: newData.username },
                    ]
                }).lean().then(async response => {
                    if (response) {
                        dataInUse = {};

                        if (response.mail) dataInUse.mail = true;
                        if (response.phone) dataInUse.phone = true;
                        if (response.username) dataInUse.username = true;

                        return res.status(409).send(dataInUse);
                    }

                    // Hash password before updating
                    if (newData.password)
                        newData.password = await bcrypt.hash(newData.password, parseInt(process.env.SALT_ROUNDS, 10));
                    
                    // Ignore null fields and return updated document after operation
                    opts = { new: true, omitUndefined: true };
                    doc = await userModel.findByIdAndUpdate(user_id, newData, opts);

                    if (doc) {
                        res.status(200).send(doc);
                    } else res.status(404).send(msg('User not found.'));
                });
                return;
            }

            return res.status(400).send(msg('New data not provided.'));
        }

        res.status(400).send(msg('User id not provided.'));
    },

    // DELETE
    deleteUser: async (req, res) => {
        const user_id = req.user.id;

        if (user_id) {
            const success = await userModel.deleteOne({ user_id });
            
            if (!success) return res.status(404).send(msg('Couldn\'t delete user.'));
            res.status(200).send(msg('Successfully deleted user.'));

            // Try to delete user image
            const img = await pictureModel.findOneAndDelete({user_id: user_id});
            if (img) {
                const uri = path.join(__dirname, '..', '..', 'imgs', img.user_id + '.' + img.ext);
                fs.unlink(uri);
                console.log(`Deleted image ${img.user_id + '.' + img.ext}`);
                return;
            }
            console.log(`Unable to delete image ${img.user_id + '.' + img.ext} or not found.`);
        }

        res.status(400).send(msg('User data not provided.'));
    }
};

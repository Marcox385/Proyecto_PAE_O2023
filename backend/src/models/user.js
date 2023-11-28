/**
 * Bugs Creators API
 * 
 * User entity schema
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables for password salt

const userSchema = new Schema({
    mail: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    username: { type: String, required: true },
    password: { type: String, requried: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS, 10));
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = model('user', userSchema);

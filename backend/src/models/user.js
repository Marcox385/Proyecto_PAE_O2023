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

const userSchema = new Schema({
    mail: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    username: { type: String },
    password: { type: String },
    posts: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    ratedComments: { type: Array, default: [] }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = model('user', userSchema);

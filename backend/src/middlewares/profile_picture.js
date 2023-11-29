/**
 * Bugs Creators API
 * 
 * Image upload middleware
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const multer = require('multer');

// Permitted file types
const validExtensions = ['jpg', 'jpeg', 'png'];

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imgs');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const name = `${req.user.id}.${ext}`;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const isValid = validExtensions.includes(ext);
    cb(null, isValid);
};

module.exports = multer({ storage, fileFilter });

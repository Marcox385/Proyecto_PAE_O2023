/**
 * Bugs Creators Source Code
 * 
 * index.js : Entry point
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const cors = require('cors');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { initializeSocket } = require('./src/helpers/socket');

// Local files
const router = require('./src/routes');

// Generate environment variables
dotenvExpand.expand(dotenv.config());

// Server initialization and initial config
const app = express();
const port = process.env.PORT || 3200;
app.use('', express.json()); // For JSON response rendering
app.use(cors()); // For frontend access
app.disable('x-powered-by'); // Hide tech stack

// Static route for user images
const imgsUrl = path.join(__dirname, 'imgs');
app.use('/imgs', express.static(imgsUrl));

// Routes initialization
app.use(router);

// Database connection first approach
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true }).then(() => {
    console.log(`Connected to MongoDB on ${process.env.TARGET_DB} database`);

    // Server (assigned to const for socket usage)
    const server = app.listen(port, () => {
        console.log(`App running on port ${port}`);
    });

    // Socket initialization
    initializeSocket(server);
}).catch(err => {
    console.log("Failed to connect to MongoDB: ", err);
});

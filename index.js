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
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Local files
const router = require('./src/routes');
const swaggerConfig = require('./swagger.config');

// Generate environment variables
dotenvExpand.expand(dotenv.config());

// Server initialization
const app = express();
const port = process.env.PORT || 3200;

// Swagger documentation endpoint
const swaggerDoc = swaggerJsDoc(swaggerConfig);
app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Static files
// const assetsUrl = path.join(__dirname, 'public');
// app.use('/assets', express.static(assetsUrl));

// Routes initialization
// app.use('/api', router); // Investigate further into this
app.use(router);

// Database connection first approach
// mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true }).then(() => {
//     console.log(`Connected to MongoDB on ${process.env.TARGET_DB} database`);

//     app.listen(port, () => {
//         console.log(`App running on port ${port}`);
//     });
// }).catch(err => {
//     console.log("Failed to connect to MongoDB: ", err);
// });
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

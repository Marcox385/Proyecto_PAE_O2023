/**
 * Bugs Creators Source Code
 * 
 * swagger.config.js : Documentation utility configuration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

const port = process.env.PORT || 3200;

module.exports = {
    swaggerDefinition: {
        swagger: '2.0',
        info: {
            title: 'Bugs Creators API',
            description: 'Backend support API for PAE O2023 project',
            version: '0.0.1',
            servers: ['http://localhost:' + port]
        }
    },
    apis: [
        'src/routes/**/*.js'
    ]
}

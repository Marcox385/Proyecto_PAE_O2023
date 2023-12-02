/**
 * Bugs Creators API
 * 
 * Socket helper for real time communications
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const socketIo = require('socket.io');

// Reusable socket access variable
let io;

// Function for socket initial configuration (call on /index.js)
function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*', // Change this to only allow requests from production frontend URL
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connection (${socket.id})`);

        socket.on('joinRoom', (roomId) => {
            console.log(`User ${roomId} logged in.`);
            socket.join(roomId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        })
    });
}

function getSocketInstance() {
    if (!io)
        throw new Error('Socket.IO not initialized. Call initializeSocket first.');

    return io;
}

module.exports = {
    initializeSocket,
    getSocketInstance,
};

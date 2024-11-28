const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS enabled
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Set up a basic route for testing
app.get('/', (req, res) => {
    res.send('WebRTC signaling server is running!');
});

// Socket.IO events
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id, socket.handshake.address);

    // Handle WebRTC signaling messages
    socket.on('offer', (payload) => {
        io.emit('offer', payload);
    });

    socket.on('answer', (payload) => {
        io.emit('answer', payload);
    });

    socket.on('ice-candidate', (payload) => {
        io.emit('ice-candidate', payload);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id, socket.handshake.address);
    });
});

// // Socket.io connection event
// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id, socket.handshake.address);

//     // Join room event
//     socket.on('join-room', (roomId) => {
//         socket.join(roomId);
//         console.log('User joined room:', roomId);
//     });

//     // Offer event
//     socket.on('offer', (payload) => {
//         const { offer, roomId } = payload;
//         io.to(roomId).emit('offer', payload);
//         // console.log(payload);

//         console.log('Sent offer to room:', roomId);
//     });

//     // Answer event
//     socket.on('answer', (payload) => {
//         const { answer, roomId } = payload;
//         io.to(roomId).emit('answer', payload);
//         console.log('Sent answer to room:', roomId);
//     });

//     // ICE candidate event
//     socket.on('ice candidate', (payload) => {
//         const { candidate, roomId } = payload;
//         io.to(roomId).emit('ice candidate', payload);
//         console.log('Sent ICE candidate to room:', roomId);
//     });

//     // Disconnect event
//     socket.on('disconnect', () => {
//         console.log('A user disconnected.');
//     });
// });


// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

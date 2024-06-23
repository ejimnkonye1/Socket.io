// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server instance
const server = http.createServer(app);

// Create a Socket.IO instance by passing the server instance
const io = socketIo(server);

// Serve static files (optional, for example purposes)
app.use(express.static(__dirname + '/public'));

// Define a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Send HTML file as response
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Send a message to clients on connection
    socket.emit('message', 'Welcome to the Socket.IO server!');

    // Example: Receive message from client
    socket.on('chat message', (msg) => {
        console.log('Message from client: ' + msg);
        // Broadcast message to all clients
        io.emit('chat message', msg);
    });

    // Example: Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server and listen on a port
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

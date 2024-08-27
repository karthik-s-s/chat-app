const { Server } = require('socket.io');
const Message = require('../models/messageModel'); // Import your Message model

let io;

exports.initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join', (room) => {
            socket.join(room);
        });

        socket.on('message', async (message) => {
            try {
                // Save message to database
                await Message.create({
                    senderId: message.senderId,
                    receiverId: message.receiverId || null,
                    groupId: message.room || null,
                    content: message.content,
                });

                if (message.room) {
                    // Group message
                    io.to(message.room).emit('message', message);
                } else if (message.receiverId) {
                    // Direct message
                    io.to(message.receiverId).emit('message', message);
                }
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

exports.getIO = () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
};

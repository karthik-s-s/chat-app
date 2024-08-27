const { Server } = require('socket.io');

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

        socket.on('message', (message) => {
            io.to(message.room).emit('message', message);
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

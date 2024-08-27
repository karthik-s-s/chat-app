require('dotenv').config();
const express = require('express');
const http = require('http');
const sequelize = require('../config/db');
const { initSocket } = require('./utils/socket');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', messageRoutes);
app.use('/api', groupRoutes);

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));

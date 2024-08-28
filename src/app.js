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

app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Base URL Info</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { margin: 20px; }
            h1 { color: #333; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Base URL Information</h1>
            <p><strong>Message:</strong> This is the base URL.</p>
            <p> Use the endpoint specified in the documentation to test this.</p>
            <p><strong>Repository:</strong> <a href="https://github.com/karthik-s-s/chat-app.git" target="_blank">https://github.com/karthik-s-s/chat-app.git</a></p>
          </div>
        </body>
      </html>
    `);
  });

app.use('/api/auth', authRoutes);
app.use('/api', messageRoutes);
app.use('/api', groupRoutes);

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));

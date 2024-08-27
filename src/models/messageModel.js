const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Message = sequelize.define('Message', {
    senderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    groupId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Message;

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Group = require('./groupModel');
const User = require('./userModel');

const GroupMember = sequelize.define('GroupMember', {
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = GroupMember;

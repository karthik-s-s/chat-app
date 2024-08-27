const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, groupId, content } = req.body;
  try {
    const message = await Message.create({
      senderId,
      receiverId,
      groupId,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessageHistory = async (req, res) => {
  // Destructuring
  const { userId, withUserId, groupId, page = 1, pageSize = 20 } = req.query;

  //converting
  const pageNumber = parseInt(page, 10) || 1;
  const pageSizeNumber = parseInt(pageSize, 10) || 20;

  // Handling optional values
  const whereClause = {
    senderId: userId,
    receiverId: withUserId || null,
    groupId: groupId || null,
  };

  try {
    const messages = await Message.findAndCountAll({
      where: whereClause,
      offset: (pageNumber - 1) * pageSizeNumber,
      limit: pageSizeNumber,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Group = require('../models/groupModel');
const GroupMember = require('../models/groupMemberModel');
const Message = require('../models/messageModel');

exports.createGroup = async (req, res) => {
  const { name, members } = req.body;
  try {
    const group = await Group.create({ name });
    await Promise.all(
      members.map((memberId) => {
        return GroupMember.create({ groupId: group.id, userId: memberId });
      })
    );
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendGroupMessage = async (req, res) => {
  const { groupId } = req.params;
  const { senderId, content } = req.body;
  try {
    const message = await Message.create({ senderId, groupId, content });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

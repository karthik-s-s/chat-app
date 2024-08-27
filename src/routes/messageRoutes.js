const express = require('express');
const { sendMessage, getMessageHistory } = require('../controllers/messageController');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/messages', protect, sendMessage);
router.get('/messages/history', protect, getMessageHistory);

module.exports = router;

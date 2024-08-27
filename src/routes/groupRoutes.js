const express = require('express');
const { createGroup, sendGroupMessage } = require('../controllers/groupController');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/groups', protect, createGroup);
router.post('/groups/:groupId/messages', protect, sendGroupMessage);

module.exports = router;

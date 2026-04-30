const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const User = require('../models/User');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const users = await User.find().select('name email role');
  res.json(users);
});

module.exports = router;
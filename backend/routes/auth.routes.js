const express = require('express');
const { body } = require('express-validator');
const { signup, login, me } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars'),
  ],
  signup
);

router.post('/login', login);
router.get('/me', protect, me);

module.exports = router;
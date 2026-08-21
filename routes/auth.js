const express = require('express');
const router = express.Router();
const { login, fetchUser } = require('../controllers/authController');

// Login route
router.post('/login', login);
router.get('/me', fetchUser);

module.exports = router;
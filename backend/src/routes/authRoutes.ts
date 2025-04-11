const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// User signup route
router.post('/signup', authController.signup);

// User login route
router.post('/login', authController.login);

// JWT token generation route
router.post('/token', authController.generateToken);

// Two-factor authentication (2FA) routes
router.post('/2fa/setup', authMiddleware, authController.setup2FA);
router.post('/2fa/verify', authMiddleware, authController.verify2FA);

module.exports = router;

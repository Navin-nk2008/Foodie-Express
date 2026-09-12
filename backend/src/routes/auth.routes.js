const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/logout', authController.logout);

module.exports = router;

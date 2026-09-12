const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);
router.post('/addresses', userController.addAddress);

module.exports = router;

const authService = require('../services/auth.service');

function sendOtp(req, res, next) {
  try {
    const { phone } = req.body;
    const result = authService.sendOtp(phone);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

function verifyOtp(req, res, next) {
  try {
    const { phone, otp } = req.body;
    const result = authService.verifyOtp(phone, otp);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}

module.exports = {
  sendOtp,
  verifyOtp,
  logout,
};

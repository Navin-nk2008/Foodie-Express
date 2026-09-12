const users = require('../data/users');

// In-memory OTP storage
const otpStore = new Map();

function sendOtp(phone) {
  if (!phone || phone.trim().length < 6) {
    throw new Error('Please provide a valid phone number');
  }

  // Academic / demo mode OTP: default to 123456 for predictable student testing
  const otp = '123456';
  otpStore.set(phone.trim(), {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  return {
    success: true,
    message: 'OTP sent successfully to registered mobile number',
    phone: phone.trim(),
    // Return demo OTP in development mode so student/professor can test without a real SMS gateway
    demoOtp: otp,
  };
}

function verifyOtp(phone, otp) {
  if (!phone || !otp) {
    throw new Error('Phone and OTP are required');
  }

  const record = otpStore.get(phone.trim());
  const isValid = (record && record.otp === otp.trim()) || otp.trim() === '123456';

  if (!isValid) {
    throw new Error('Invalid or expired OTP. Please try again.');
  }

  // Clear OTP
  otpStore.delete(phone.trim());

  // Find or create user
  let user = users.find((u) => u.phone === phone.trim());
  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      name: 'Foodie Gourmet',
      phone: phone.trim(),
      email: 'gourmet@foodie-express.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      addresses: [
        {
          id: 'addr-1',
          title: 'Home',
          addressLine: 'Flat 402, Oakwood Heights, Evergreen St',
          area: 'Midtown',
          city: 'Chennai',
          isDefault: true,
          note: 'Leave with security guard',
        },
      ],
      favorites: [1, 2],
    };
    users.push(user);
  }

  const token = `foodie_token_${Buffer.from(`${user.id}:${Date.now()}`).toString('base64')}`;

  return {
    success: true,
    token,
    user,
  };
}

module.exports = {
  sendOtp,
  verifyOtp,
};

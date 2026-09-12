const users = require('../data/users');

function getProfile(req, res) {
  const user = users[0]; // demo primary user
  res.status(200).json({ user });
}

function updateProfile(req, res) {
  const user = users[0];
  const { name, email, avatar } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (avatar) user.avatar = avatar;
  res.status(200).json({ user, message: 'Profile updated successfully' });
}

function addAddress(req, res) {
  const user = users[0];
  const { title, addressLine, area, city, note } = req.body;
  const newAddr = {
    id: `addr-${Date.now()}`,
    title: title || 'Other',
    addressLine,
    area,
    city: city || 'Chennai',
    isDefault: false,
    note,
  };
  user.addresses.push(newAddr);
  res.status(201).json({ address: newAddr, addresses: user.addresses });
}

module.exports = {
  getProfile,
  updateProfile,
  addAddress,
};

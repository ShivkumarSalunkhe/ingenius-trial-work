const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile. Please try again later.' });
  }
};

exports.updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(req.session.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (username && user.username !== username) user.username = username;
    if (email && user.email !== email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile. Please try again later.' });
  }
};

const { User } = require('../models');

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  res.status(200).json(user);
};

exports.updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findByPk(req.session.user.id);
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.status(200).json(user);
};

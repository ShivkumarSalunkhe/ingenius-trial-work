const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  req.session.user = user;
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out' });
};

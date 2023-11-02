const User = require('.../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

exports.register = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.username || !userData.email || !userData.password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'The user is already registered' });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error when registering the user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error logging in' });
  }
};

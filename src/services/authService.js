const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

async function registerUser(userData) {
  try {
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('The user is already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'client', // Asigna un rol predeterminado si no se proporciona
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
};

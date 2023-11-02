const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await authService.registerUser(userData);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

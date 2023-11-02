const userService = require('../services/userService');

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserInfo(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

const userService = require('../services/userService');

/**
 * @api {get} /users/:id Get User Information
 * @apiName GetUserInfo
 * @apiGroup Users
 */
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

/**
 * @api {put} /users/:id Update User Information
 * @apiName UpdateUserInfo
 * @apiGroup Users
 */
exports.updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const message = await userService.updateUserInfo(userId, updatedData);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

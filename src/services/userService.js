const User = require('../models/user');

async function getUserInfo(userId) {
  try {
    if (!userId) {
      throw new Error('Valid user ID required');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserInfo(userId, updatedData) {
  try {
    if (!userId) {
      throw new Error('Valid user ID required');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (updatedData.username) {
      user.username = updatedData.username;
    }
    if (updatedData.email) {
      user.email = updatedData.email;
    }
    if (updatedData.role) {
      user.role = updatedData.role;
    }

    await user.save();

    return 'User information updated successfully';
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    if (!userId) {
      throw new Error('Valid user ID required');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  deleteUser,
};

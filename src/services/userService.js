const User = require('../models/User');

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

module.exports = {
  getUserInfo,
};

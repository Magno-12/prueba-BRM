const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const UserRoles = {
        ADMIN: 'admin',
        CLIENT: 'client',
      };

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(UserRoles)),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;

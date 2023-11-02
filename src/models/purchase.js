const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

class Purchase extends Model {}

Purchase.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Purchase',
  }
);

module.exports = Purchase;

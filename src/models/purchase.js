const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Purchase extends Model {}

Purchase.init(
  {
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

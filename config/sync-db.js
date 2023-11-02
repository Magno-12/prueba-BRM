const sequelize = require('./database');
const Product = require('../src/models/product');
const Purchase = require('../src/models/purchase');
const User = require('../src/models/user');


async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database successfully synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
}

syncDatabase();

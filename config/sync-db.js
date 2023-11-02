const sequelize = require('./config/database');
const models = require('./models');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database successfully synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
}

syncDatabase();

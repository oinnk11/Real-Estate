const { Sequelize } = require('sequelize');

// Connect to SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './realestate.db.sqlite',
});

module.exports = sequelize;

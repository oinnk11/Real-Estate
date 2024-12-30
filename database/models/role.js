const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../connection.js');

const Role = sequelize.define('Role', {
    role_id: DataTypes.INTEGER,
    role: DataTypes.STRING,

  });
  module.exports = Role;


  
const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../connection.js');

const Status = sequelize.define('Status', {
    status_id: DataTypes.INTEGER,
    status: DataTypes.STRING,

  });
  module.exports = Status;


  
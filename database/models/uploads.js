const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../connection.js');

const Upload = sequelize.define('Upload', {
    upload_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    property_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,

  });
  module.exports = Upload;


  
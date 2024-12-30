const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../connection.js');

const Property = sequelize.define('Property', {
    property_id: DataTypes.INTEGER,
    property_name: DataTypes.STRING,
    property_location: DataTypes.STRING,
    property_size: DataTypes.STRING,
    seller_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    review_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,

  });
  module.exports = Property;


  
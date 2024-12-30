const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../connection.js');

const Booking = sequelize.define('Booking', {
    booking_id: DataTypes.INTEGER,
    property_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,


  });
  module.exports = Booking;


  
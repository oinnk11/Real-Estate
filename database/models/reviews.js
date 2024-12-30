const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../connection.js');

const Review = sequelize.define('Review', {
    review_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,

  });
  module.exports = Review;


  
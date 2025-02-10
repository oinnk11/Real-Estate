import { DataTypes } from "sequelize"; // Import Sequelize and DataTypes
import sequelize from "../connection.js"; // Import your database connection
import Listing from "./listings.js";
import User from "./users.js";

// Define the Booking model
const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Refers to the User model
        key: "id", // References the 'id' column in the User model
      },
      allowNull: false,
    },
    listingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Listing, // Refers to the Listing model
        key: "id", // References the 'id' column in the Listing model
      },
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    timestamps: true, // Enable created and updated at timestamps
  }
);

// Define the relationship between Booking and User (One-to-Many)
Booking.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" }); // A booking belongs to a user
User.hasMany(Booking, { foreignKey: "userId" }); // A user can have multiple bookings

export default Booking;

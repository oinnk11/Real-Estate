import { DataTypes } from "sequelize"; // Import Sequelize and DataTypes
import sequelize from "../connection.js"; // Import your database connection
import User from "./users.js";
import Listing from "./listings.js";

// Define the Notification model
const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
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
        model: Listing, // Refers to the User model
        key: "id", // References the 'id' column in the Listing model
      },
      allowNull: true,
    },
  },
  {
    tableName: "notifications",
    timestamps: true, // Enable created and updated at timestamps
  }
);

// Define the relationship between Notification and User (One-to-Many)
Notification.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" }); // A notification belongs to a user
User.hasMany(Notification, { foreignKey: "userId" }); // A user can have multiple notifications

export default Notification;

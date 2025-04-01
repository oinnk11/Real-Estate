import { DataTypes } from "sequelize"; // Import Sequelize and DataTypes
import sequelize from "../connection.js"; // Import your database connection

// Define the User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user", // Default role is "user"
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true, // Enable created and updated at timestamps
  }
);

export default User;

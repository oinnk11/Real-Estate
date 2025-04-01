import { DataTypes } from "sequelize"; // Import Sequelize and DataTypes
import sequelize from "../connection.js"; // Import your database connection
import User from "./users.js";
import Listing from "./listings.js";

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
        model: User,
        key: "id",
      },
    },
    listingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Listing,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
    khaltiTransactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "bookings",
    timestamps: true, // Enable created and updated at timestamps
  }
);

Booking.belongsTo(User, {
  foreignKey: "userId",
  as: "buyer",
  onDelete: "CASCADE",
});

User.hasMany(Booking, { foreignKey: "userId", as: "buyer" });

Booking.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
  onDelete: "CASCADE",
});

Listing.hasOne(Booking, { foreignKey: "listingId", as: "booking" });

export default Booking;

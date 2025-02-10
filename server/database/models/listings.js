import { DataTypes } from "sequelize"; // Import Sequelize and DataTypes
import sequelize from "../connection.js"; // Import your database connection
import User from "./users.js";
import ListingType from "./listingTypes.js";

// Define the Listing model
const Listing = sequelize.define(
  "Listing",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("Booked", "Available"),
      defaultValue: "Available",
    },
    listingTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ListingType, // Refers to the ListingType model
        key: "id", // References the 'id' column in the ListingType model
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Refers to the User model
        key: "id", // References the 'id' column in the User model
      },
      allowNull: false,
    },
  },
  {
    tableName: "listings",
    timestamps: true, // Enable created and updated at timestamps
  }
);

// Define the relationship between Listing and User (One-to-Many)
Listing.belongsTo(User, {
  as: "seller",
  foreignKey: "userId",
  onDelete: "CASCADE",
}); // A listing belongs to a user
User.hasMany(Listing, { foreignKey: "userId" }); // A user can have multiple listings

// Define the relationship between Listing and ListingType (One-to-Many)
Listing.belongsTo(ListingType, {
  as: "type",
  foreignKey: "listingTypeId",
  onDelete: "SET NULL",
}); // A listing belongs to a ListingType
ListingType.hasMany(Listing, { foreignKey: "listingTypeId" }); // A ListingType can have multiple listings

export default Listing;

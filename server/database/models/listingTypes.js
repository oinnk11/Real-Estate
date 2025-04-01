import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

// Define listing types model
const ListingType = sequelize.define(
  "ListingType",
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
  },
  {
    tableName: "listing_types",
    timestamps: true, // Enable created and updated at timestamps
  }
);

export default ListingType;

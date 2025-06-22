import { Sequelize } from "sequelize";

// Create a Sequelize instance and connect to the SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/restate.sqlite", // Path to SQLite database file,
  logging: false,
});

export default sequelize;

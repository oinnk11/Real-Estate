import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import User from "./users.js";

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "chats",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user1Id", "user2Id"],
      },
    ],
  }
);

Chat.belongsTo(User, {
  as: "user1",
  foreignKey: "user1Id",
  onDelete: "CASCADE",
});
Chat.belongsTo(User, {
  as: "user2",
  foreignKey: "user2Id",
  onDelete: "CASCADE",
});

User.hasMany(Chat, { as: "chatsInitiated", foreignKey: "user1Id" });
User.hasMany(Chat, { as: "chatsReceived", foreignKey: "user2Id" });

export default Chat;

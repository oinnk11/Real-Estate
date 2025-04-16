import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import Chat from "./chats.js";
import User from "./users.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isSeen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  }
);

Message.belongsTo(Chat, {
  foreignKey: {
    name: "chatId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Message.belongsTo(User, {
  as: "sender",
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Chat.hasMany(Message, { foreignKey: "chatId" });

User.hasMany(Message, { foreignKey: "userId", as: "sentMessages" });

export default Message;

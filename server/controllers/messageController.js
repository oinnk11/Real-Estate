import { Op } from "sequelize";
import Chat from "../database/models/chats.js";
import Message from "../database/models/messages.js";
import User from "../database/models/users.js";
import { handleError } from "../utils/handleError.js";
import { getIO } from "../utils/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: senderId } = req?.user;
    const { chatId, content, receiverId } = req.body;

    if (!chatId || !content || !senderId || !receiverId)
      return res.status(401).json({ message: "All fields are required." });

    let chat = await Chat.findOne({ where: { id: chatId } });

    if (!chat) {
      chat = await Chat.create({
        user1Id: senderId,
        user2Id: receiverId,
      });
    }

    const sender = await User.findOne({ where: { id: senderId } });
    if (!sender) return res.status(404).json({ message: "Invalid Sender ID." });

    const receiver = await User.findOne({ where: { id: receiverId } });
    if (!receiver)
      return res.status(404).json({ message: "Invalid Receiver ID." });

    const message = await Message.create({
      chatId: chat.id,
      userId: senderId,
      content,
    });

    const sentMessage = await Message.findOne({
      where: { id: message.id },
      include: {
        model: User,
        as: "sender",
        attributes: ["id", "name", "email"],
      },
    });

    const io = getIO();
    io.to(receiverId).emit("receiveMessage", sentMessage);
    io.to(senderId).emit("receiveMessage", sentMessage);

    return res.status(201).json(message);
  } catch (error) {
    return handleError(error, res);
  }
};

export const getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) return res.status(404).json({ message: "Chat not found." });

    const messages = await Message.findAll({
      where: { chatId },
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "email"] },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    return handleError(error, res);
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const { chatId } = req.params;

    if (!chatId)
      return res.status(401).json({ message: "Chat ID is required." });

    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) return res.status(404).json({ message: "Chat not found." });

    if (chat.user1Id !== userId && chat.user2Id !== userId) {
      return res.status(403).json({
        message: "Action unauthorized. Not part of this converstation.",
      });
    }

    const unseenMessages = await Message.findAll({
      where: {
        chatId,
        userId: { [Op.ne]: userId },
        isSeen: false,
      },
    });

    await Message.update(
      { isSeen: true },
      {
        where: {
          chatId,
          userId: { [Op.ne]: userId },
          isSeen: false,
        },
      }
    );

    if (unseenMessages.length > 0) {
      const io = getIO();
      const senderId = unseenMessages[0].userId;

      io.to(senderId).emit("messageSeen", {
        message: unseenMessages.pop(),
      });
    }

    res.status(200).json({ message: "Message seen." });
  } catch (error) {
    handleError(error, res);
  }
};

import { Op } from "sequelize";
import Chat from "../database/models/chats.js";
import User from "../database/models/users.js";
import Message from "../database/models/messages.js";
import { handleError } from "../utils/handleError.js";

export const createChat = async (req, res) => {
  try {
    const { initiatorId: inId, receiverId: rId } = req.body;

    const initiatorId = parseInt(inId);
    const receiverId = parseInt(rId);

    if (!initiatorId || !receiverId)
      return res.status(400).json({ message: "Two user IDs are required." });

    if (initiatorId === 1 || receiverId === 1)
      return res.status(400).json({ message: "Invalid User IDs." });

    if (initiatorId === receiverId)
      return res
        .status(400)
        .json({ message: "Can't send message to yourself." });

    const initiator = await User.findOne({ where: { id: initiatorId } });
    if (!initiator)
      return res
        .status(404)
        .json({ message: `User - ${initiatorId} not found.` });

    const receiver = await User.findOne({ where: { id: receiverId } });
    if (!receiver)
      return res
        .status(404)
        .json({ message: `User - ${receiverId} not found.` });

    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { user1Id: initiatorId, user2Id: receiverId },
          { user1Id: receiverId, user2Id: initiatorId },
        ],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        user1Id: initiatorId,
        user2Id: receiverId,
      });
    }

    const chatWithLatest = await Chat.findOne({
      where: { id: chat.id },
      include: [
        {
          model: Message,
          limit: 1,
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    return res.status(201).json(chatWithLatest);
  } catch (error) {
    handleError(error, res);
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const existingUser = await User.findOne({ where: { id: userId } });
    if (!existingUser)
      return res.status(404).json({ message: "User not found." });

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: [
        { model: User, as: "user1", attributes: ["id", "name", "email"] },
        { model: User, as: "user2", attributes: ["id", "name", "email"] },
        { model: Message, limit: 1, order: [["createdAt", "DESC"]] },
      ],
      order: [["updatedAt", "DESC"]],
    });

    return res.status(200).json(chats);
  } catch (error) {
    handleError(error, res);
  }
};

export const getChatById = async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);

    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required." });
    }

    const chat = await Chat.findOne({
      where: { id: chatId },
      include: [
        { model: User, as: "user1", attributes: ["id", "name", "email"] },
        { model: User, as: "user2", attributes: ["id", "name", "email"] },
      ],
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    handleError(error, res);
  }
};

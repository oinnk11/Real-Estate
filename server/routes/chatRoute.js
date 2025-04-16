import express from "express";
import {
  createChat,
  getChatById,
  getUserChats,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createChat);

router.get("/:chatId", getChatById);
router.get("/user/:userId", getUserChats);

export default router;

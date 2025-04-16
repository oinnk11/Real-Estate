import express from "express";
import {
  getMessagesByChat,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", sendMessage);
router.patch("/seen/:chatId", markMessageAsSeen);

router.get("/chat/:chatId", getMessagesByChat);

export default router;

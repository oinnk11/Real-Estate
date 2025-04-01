import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", authenticateToken, getNotifications);
router.delete("/:id", authenticateToken, deleteNotification);

export default router;

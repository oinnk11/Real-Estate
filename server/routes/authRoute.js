import express from "express";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/user", authenticateToken, getUser);

export default router;

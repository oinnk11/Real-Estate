import express from "express";
import { editProfile } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.patch("/edit", authenticateToken, editProfile);

export default router;

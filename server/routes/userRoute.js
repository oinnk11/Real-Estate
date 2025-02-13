import express from "express";
import { editProfile, getProfileData } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/profile", authenticateToken, getProfileData);
router.patch("/edit", authenticateToken, editProfile);

export default router;

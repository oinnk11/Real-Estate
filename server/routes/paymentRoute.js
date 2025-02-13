import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  initiatePayment,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", authenticateToken, initiatePayment);
router.get("/verify", paymentVerification);

export default router;

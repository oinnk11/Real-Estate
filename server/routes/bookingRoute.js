import express from "express";
import {
  authenticateAdmin,
  authenticateToken,
} from "../middleware/authenticateToken.js";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getBookingsByUserId,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", authenticateToken, getBookings);
router.get("/user", authenticateToken, getBookingsByUserId);

router.post("/", authenticateAdmin, createBooking);

router.delete("/:id", authenticateToken, deleteBooking);

export default router;

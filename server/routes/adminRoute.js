import express from "express";
import { authenticateAdmin } from "../middleware/authenticateToken.js";
import {
  changePassword,
  createUser,
  deleteListing,
  deleteUser,
  getBookings,
  getDashboardData,
  getUsers,
  updateListing,
  updateUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", authenticateAdmin, getDashboardData);

router.patch("/change-password", authenticateAdmin, changePassword);

router.patch("/listing", authenticateAdmin, updateListing);
router.delete("/listing/:id", authenticateAdmin, deleteListing);

router.post("/user", authenticateAdmin, createUser);
router.get("/users", authenticateAdmin, getUsers);
router.patch("/user", authenticateAdmin, updateUser);
router.delete("/user/:id", authenticateAdmin, deleteUser);

router.get("/bookings", authenticateAdmin, getBookings);

export default router;

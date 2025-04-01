import express from "express";
import {
  createListing,
  deleteListing,
  getListings,
  getListingsByViews,
  getListingTypes,
  handleListingClick,
  locationAutoComplete,
  updateListing,
} from "../controllers/listingController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import upload from "../middleware/upload.js";

const router = express();

router.post(
  "/create",
  authenticateToken,
  upload.array("images", 10),
  (err, req, res, next) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({ message: err.message });
    }
    next();
  },
  createListing
);
router.post("/view/:id", authenticateToken, handleListingClick);

router.get("/", getListings);
router.get("/by-views", getListingsByViews);
router.get("/types", getListingTypes);
router.get("/auto-complete", authenticateToken, locationAutoComplete);

router.patch(
  "/edit",
  authenticateToken,
  upload.array("newImages", 10),
  (err, req, res, next) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({ message: err.message });
    }
    next();
  },
  updateListing
);

router.delete("/:id", authenticateToken, deleteListing);

export default router;

import Booking from "../database/models/bookings.js";
import Listing from "../database/models/listings.js";
import User from "../database/models/users.js";
import { Op } from "sequelize";
import { generateToken, setCookieToken } from "../utils/token.js";
import { handleError } from "../utils/handleError.js";

export const editProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { name, phone } = req.body;

    // Validate input
    if (!name || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the phone number is already in use by another user
    const existingPhone = await User.findOne({
      where: { phone, id: { [Op.ne]: id } }, // Exclude the current user's ID
    });

    if (existingPhone) {
      return res.status(400).json({
        message:
          "That phone number is already associated with another account.",
      });
    }

    // Update the user's profile
    await User.update({ name, phone }, { where: { id } });

    const user = await User.findByPk(id);

    const listingCount = await Listing.count({
      where: {
        userId: user.id,
      },
    });

    const bookingCount = await Booking.count({
      where: {
        userId: user.id,
        status: "completed", // Only count transactions with 'completed' status
      },
    });

    const totalViews = await Listing.sum("views", {
      where: {
        userId: user.id,
      },
    });

    // Generate JWT token
    const token = generateToken(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        listingCount,
        bookingCount,
        totalViews,
      },
      "14d"
    );

    setCookieToken(res, token, 14);

    return res.status(200).json({
      message: "Profile updated successfully.",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getProfileData = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: "User ID is required." });

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    const listingCount = await Listing.count({
      where: {
        userId: user.id,
      },
    });

    const bookingCount = await Booking.count({
      where: {
        userId: user.id,
        status: "Completed", // Only count transactions with 'completed' status
      },
    });

    const totalViews = await Listing.sum("views", {
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({ listingCount, bookingCount, totalViews });
  } catch (error) {
    handleError(error, res);
  }
};

import User from "../database/models/users.js";
import { Op } from "sequelize";
import { generateToken, setCookieToken } from "../utils/token.js";

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

    // Generate JWT token
    const token = generateToken(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      "14d"
    );

    setCookieToken(res, token, 14);

    return res.status(200).json({
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log("🚀 ~ error editProfile controller:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

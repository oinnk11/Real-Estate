import User from "../database/models/users.js";
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For generating JWT tokens
import { generateToken, setCookieToken } from "../utils/token.js";
import { handleError } from "../utils/handleError.js";
import Listing from "../database/models/listings.js";
import Booking from "../database/models/bookings.js";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/constants.js";

export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: "All fields are required." });

    // Compare the provided email and phone to the regex
    const validPhone = PHONE_REGEX.test(phone);
    const validEmail = EMAIL_REGEX.test(email);

    if (!validPhone)
      return res.status(400).json({ message: "Invalid phone number." });

    if (!validEmail)
      return res.status(400).json({ message: "Invalid email address." });

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const existingPhone = await User.findOne({ where: { phone } });

    if (existingPhone) {
      return res.status(400).json({
        message: "An account associated with that phone number already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
      "14d"
    );

    setCookieToken(res, token, 14);

    // Send response with the token and user info
    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    if (email === process.env.ADMIN_EMAIL) {
      return res.status(404).json({ message: "Account not found." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "Account not found." });

    // Check if password matches from the database
    const passwordVerified = await bcrypt.compare(password, user.password);

    if (!passwordVerified)
      return res
        .status(400)
        .json({ message: "Incorrect password. Try again." });

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

    // Send response with the token
    return res.status(200).json({
      message: "Logged in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.cookies?.token; // Get token from cookie

    // Return unauthorized message if token not found
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized. Token not found." });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json(decodedToken);
  } catch (error) {
    handleError(error, res);
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the token from the cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const admin = await User.findOne({ where: { email, role: "admin" } });

    if (!admin)
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword)
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });

    // Generate JWT token
    const token = generateToken(
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
      },
      "14d"
    );

    setCookieToken(res, token, 14);

    // Send response with the token
    return res.status(200).json({
      message: "Logged in successfully.",
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

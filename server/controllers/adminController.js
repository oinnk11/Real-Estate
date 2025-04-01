import { Op } from "sequelize";
import Listing from "../database/models/listings.js";
import Booking from "../database/models/bookings.js";
import ListingType from "../database/models/listingTypes.js";
import User from "../database/models/users.js";
import { handleError } from "../utils/handleError.js";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/constants.js";
import bcrypt from "bcryptjs";

const bookingInclude = [
  {
    model: User, // Include the user who made the booking
    as: "buyer", // Alias
    attributes: ["id", "name", "email"], // Specify the attributes to fetch
  },
  {
    model: Listing,
    as: "listing",
    attributes: [
      "id",
      "title",
      "price",
      "description",
      "listingTypeId",
      "location",
      "status",
      "userId",
      "thumbnail",
      "images",
      "bathrooms",
      "bedrooms",
    ],
    include: [
      {
        model: User, // Include the user who posted the listing
        as: "seller",
        attributes: ["id", "name", "email"], // Specify the attributes to fetch
      },
      {
        model: ListingType,
        as: "type",
        attributes: ["id", "name"],
      },
    ],
  },
];

export const updateListing = async (req, res) => {
  try {
    const {
      listingId,
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      listingTypeId,
    } = req.body;

    if (!listingId)
      return res
        .status(400)
        .json({ message: "Listing ID is required to edit." });

    if (
      !title ||
      !description ||
      !price ||
      !bedrooms ||
      !bathrooms ||
      !listingTypeId
    )
      return res.status(400).json({ message: "All fields are required." });

    const listingType = await ListingType.findByPk(listingTypeId);

    if (!listingType)
      return res.status(400).json({ message: "Listing type not found." });

    const listing = await Listing.findByPk(listingId);

    if (!listing)
      return res.status(404).json({ message: "Listing not found." });

    // Update the listing
    await Listing.update(
      {
        title,
        description,
        price,
        bedrooms,
        bathrooms,
        listingTypeId,
      },
      { where: { id: listingId } }
    );

    const updatedListing = await Listing.findByPk(listingId);

    return res.status(201).json({
      message: "Listing updated successfully.",
      listing: updatedListing,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "Listing Id is required." });

    const listing = await Listing.findByPk(id);

    if (!listing)
      return res.status(404).json({ message: "Listing not found." });

    await Listing.destroy({ where: { id: listing.id } });

    return res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if ((!name || !email || !phone, !password))
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
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.ne]: "admin", // Exclude users with the role 'admin'
        },
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;

    if (!id)
      return res.status(400).json({ message: "User ID is required to edit." });

    if (!name || !email || !phone)
      return res.status(400).json({ message: "All fields are required." });

    // Compare the provided email and phone to the regex
    const validPhone = PHONE_REGEX.test(phone);
    const validEmail = EMAIL_REGEX.test(email);

    if (!validPhone)
      return res.status(400).json({ message: "Invalid phone number." });

    if (!validEmail)
      return res.status(400).json({ message: "Invalid email address." });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const verifyEmail = await User.findAll({
      where: {
        email: email, // Check for duplicate email
        id: {
          [Op.ne]: id, // Exclude the current user being edited
        },
      },
    });

    if (verifyEmail.length > 0) {
      return res
        .status(400)
        .json({ message: "Email address is already in use." });
    }

    // Update the listing
    await User.update(
      {
        name,
        email,
        phone,
      },
      { where: { id } }
    );

    const updatedUser = await User.findByPk(id);

    return res.status(200).json({
      message: "Listing updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "User Id is required." });

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    await User.destroy({ where: { id: user.id } });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [["createdAt", "DESC"]],
      include: bookingInclude,
    });

    return res.status(200).json(bookings);
  } catch (error) {
    handleError(error, res);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.user;

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword)
      return res.status(400).json({ message: "All fields are required." });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const user = await User.findByPk(id);

    const validPassword = await bcrypt.compare(oldPassword, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "Incorrect password." });

    const isSame = await bcrypt.compare(newPassword, user.password);

    if (isSame)
      return res
        .status(400)
        .json({ message: "Password can't be the same as the old one." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user
    await User.update(
      {
        password: hashedPassword,
      },
      { where: { id } }
    );

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const userCount = await User.count();
    const listingCount = await Listing.count();
    const bookingCount = await Booking.count();

    // Get Start and End days of current month
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ); // First day of the month

    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
      23,
      59,
      59
    ); // Last day of the month

    const transactions = await Booking.sum("amount", {
      where: {
        status: "Completed",
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const recentBookings = await Booking.findAll({
      include: [
        {
          model: User, // Include the user who made the booking
          as: "buyer", // Alias
          attributes: ["id", "name", "email"], // Specify the attributes to fetch
        },
        {
          model: Listing,
          as: "listing",
          include: [
            {
              model: User, // Include the user who posted the listing
              as: "seller",
              attributes: ["id", "name", "email"], // Specify the attributes to fetch
            },
            {
              model: ListingType,
              as: "type",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      limit: 5,
    });

    return res.status(200).json({
      userCount,
      listingCount,
      bookingCount,
      transactions: transactions ?? 0,
      recentBookings,
    });
  } catch (error) {
    handleError(error, res);
  }
};

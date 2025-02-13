import Booking from "../database/models/bookings.js";
import Listing from "../database/models/listings.js";
import ListingType from "../database/models/listingTypes.js";
import User from "../database/models/users.js";
import { handleError } from "../utils/handleError.js";

const include = [
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

export const getBookings = async (req, res) => {
  try {
    const { limit, id, userId } = req.query;

    const queryOptions = {
      where: {
        status: "Completed",
      },
      order: [["createdAt", "DESC"]],
      include,
    };

    if (limit) {
      if (isNaN(limit) || parseInt(limit, 10) <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid limit. It must be a positive number." });
      }

      queryOptions.limit = limit;
    }

    if (id) {
      queryOptions.where.id = id;
    }

    if (userId) {
      queryOptions.where.userId = userId;
    }

    const bookings = await Booking.findAll(queryOptions);

    return res.status(200).json(bookings);
  } catch (error) {
    handleError(error, res);
  }
};

export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ message: "User Id is required." });

    const bookings = await Booking.findAll({
      where: { userId, status: "Completed" },
      include,
    });

    return res.status(200).json(bookings);
  } catch (error) {
    handleError(error, res);
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId, listingId, amount } = req.body;

    if (!userId || !listingId || !amount)
      return res.status(400).json({ message: "All fields are required." });

    const user = await User.findByPk(userId);

    if (!user) return res.status(400).json({ message: "User not found." });

    const listing = await Listing.findByPk(listingId);

    if (!listing)
      return res.status(400).json({ message: "Listing not found." });

    if (listing.userId === user.id)
      return res.status(400).json({ message: "This user posted the listing." });

    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid amount." });

    const isBooked = await Booking.findOne({
      where: { listingId, status: "Completed" },
    });

    if (isBooked)
      return res.status(400).json({ message: "Listing is already booked." });

    const booking = await Booking.create({
      userId,
      listing,
      amount,
      status: "Completed",
    });

    return res
      .status(201)
      .json({ message: "Booking created successfully.", booking });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "Booking ID is required." });

    const booking = await Booking.findByPk(id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found." });

    if (booking.status === "Completed")
      return res.status(400).json({ message: "Booking is already completed." });

    await Booking.destroy({ where: { id: booking.id } });

    return res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

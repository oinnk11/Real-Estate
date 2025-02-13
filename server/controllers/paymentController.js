import axios from "axios";
import Listing from "../database/models/listings.js";
import {
  BOOKING_COMMISSION,
  CLIENT_URL,
  KHALTI_URL,
  RETURN_URL,
} from "../utils/constants.js";
import { handleError } from "../utils/handleError.js";
import Booking from "../database/models/bookings.js";
import Notification from "../database/models/notifications.js";
import User from "../database/models/users.js";
import ListingType from "../database/models/listingTypes.js";

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

export const initiatePayment = async (req, res) => {
  try {
    const { id: userId, name, email, phone } = req.user;
    const { amount, listingId } = req.body;

    if (!amount)
      return res.status(400).json({ message: "Amount is required." });

    if (!listingId)
      return res.status(400).json({ message: "Listing Id is required." });

    const listing = await Listing.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.status !== "Available")
      return res.status(400).json({ message: "Listing is already booked." });

    if (listing.userId === userId)
      return res.status(400).json({ message: "Can't book your own listing." });

    const commission = amount * BOOKING_COMMISSION;

    const booking = await Booking.create({
      amount: commission,
      userId,
      listingId,
    });

    const khaltiPayload = {
      amount: 1000, // Rs 10 is max for dev, should be replaced by commission in prod
      purchase_order_id: booking.id,
      purchase_order_name: `Booking for ID: ${listing.id} - ${listing.title}`,
      customer_info: {
        name: name,
        email: email,
        phone: phone,
      },
      website_url: CLIENT_URL,
      return_url: RETURN_URL,
    };

    const khaltiResponse = await axios.post(KHALTI_URL, khaltiPayload, {
      headers: {
        Authorization: `KEY ${process.env.KHALTI_LIVE_SECRET_KEY}`,
      },
    });

    const data = khaltiResponse.data;

    await Booking.update(
      { khaltiTransactionId: data.pidx },
      { where: { id: booking.id } }
    );

    // Return the payment URL to the client
    res.status(200).json({
      message: "Payment initiated successfully",
      paymentUrl: data.payment_url,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const {
      pidx: khaltiTransactionId,
      purchase_order_id: id,
      status,
    } = req.query;

    await Booking.update(
      { status },
      {
        where: { id, khaltiTransactionId },
        returning: true,
      }
    );

    const booking = await Booking.findByPk(id, { include });
    console.log("🚀 ~ booking:", booking);

    if (booking.status === "Completed") {
      await Listing.update(
        { status: "Booked" },
        { where: { id: booking.listingId } }
      );
    }

    const buyerMessage = `Your booking for listing #${booking.listingId} has been completed.`;
    const sellerMessage = `Your listing #${booking.listingId} has been booked.`;

    await Notification.create({
      message: buyerMessage,
      userId: booking.buyer.id,
      listingId: booking.listingId,
    });
    await Notification.create({
      message: sellerMessage,
      userId: booking.listing.userId,
      listingId: booking.listingId,
    });

    return res.redirect(
      `${CLIENT_URL}/payment?listingId=${booking.listingId}&status=${booking.status}`
    );
  } catch (error) {
    handleError(error, res);
  }
};

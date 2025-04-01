import express from "express";
import dotenv from "dotenv";
import sequelize from "./database/connection.js";
import { seedDatabase } from "./database/seedDatabase.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// IMPORT THE MODELS
import User from "./database/models/users.js";
import ListingType from "./database/models/listingTypes.js";
import Listing from "./database/models/listings.js";
import Booking from "./database/models/bookings.js";
import Notification from "./database/models/notifications.js";

// IMPORT THE ROUTES
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import listingRoute from "./routes/listingRoute.js";
import adminRoute from "./routes/adminRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import notificationRoute from "./routes/notificationRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Test database connection and start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync the models with the database
    await sequelize.sync();
    console.log("Database synchronized!");

    await seedDatabase();

    // Register middleware/routes BEFORE starting the server
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(cookieParser()); // To parse cookies

    // ROUTES
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/listing", listingRoute);
    app.use("/api/admin", adminRoute);
    app.use("/api/payment", paymentRoute);
    app.use("/api/booking", bookingRoute);
    app.use("/api/notification", notificationRoute);

    app.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

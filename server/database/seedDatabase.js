import ListingType from "./models/listingTypes.js";
import User from "./models/users.js";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  try {
    // Check if there are any users and if an admin already exists
    const adminExists = await User.findOne({ where: { role: "admin" } });

    // Create an admin user if none exists
    if (!adminExists) {
      const email = process.env.ADMIN_EMAIL;
      const password = process.env.ADMIN_PASSWORD;
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password with a salt of 10

      await User.create({
        name: "Admin",
        email: email,
        phone: 1234567890,
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created!");
    }

    const listingTypeCount = await ListingType.count();

    if (listingTypeCount === 0) {
      const types = ["house", "apartment", "flat"];
      const typeData = types.map((type) => ({ name: type })); // Prepare data for bulk insert

      await ListingType.bulkCreate(typeData); // Insert multiple rows at once
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

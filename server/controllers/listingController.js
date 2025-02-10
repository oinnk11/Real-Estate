import axios from "axios";
import Listing from "../database/models/listings.js";
import ListingType from "../database/models/listingTypes.js";
import { handleError } from "../utils/handleError.js";
import User from "../database/models/users.js";
import { Op } from "sequelize";

export const getListings = async (req, res) => {
  try {
    const { id, userId, type, minPrice, maxPrice, location } = req.query;

    const where = {};

    // Handle filters
    if (id) where.id = id;
    if (userId) where.userId = userId;
    if (type) where.listingTypeId = type;
    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] }; // Price between minPrice and maxPrice
    } else if (minPrice) {
      where.price = { [Op.gte]: minPrice }; // Price greater than or equal to minPrice
    } else if (maxPrice) {
      where.price = { [Op.lte]: maxPrice }; // Price less than or equal to maxPrice
    }
    if (location) where.location = { [Op.like]: `%${location}%` };

    const listings = await Listing.findAll({
      where,
      include: [
        {
          model: User,
          as: "seller",
          attributes: ["id", "name", "phone", "email"], // Customize fields
        },
        {
          model: ListingType,
          as: "type",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!listings)
      return res.status(404).json({ message: "Listing not found." });

    return res.status(200).json(listings);
  } catch (error) {
    handleError(error, res);
  }
};

export const createListing = async (req, res) => {
  try {
    const { id } = req.user;

    const { title, description, price, location, bedrooms, bathrooms, typeId } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !bedrooms ||
      !bathrooms
    )
      return res.status(400).json({ message: "All fields are required." });

    const listingType = await ListingType.findByPk(typeId);

    if (!listingType)
      return res.status(400).json({ message: "Listing type not found." });

    // Handle image uploads
    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs from upload middleware

    const listing = await Listing.create({
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      listingTypeId: listingType.id,
      thumbnail: imageUrls[0],
      images: imageUrls,
      userId: id,
    });

    return res
      .status(201)
      .json({ message: "Listing posted successfully.", listing });
  } catch (error) {
    handleError(error, res);
  }
};

export const getListingTypes = async (req, res) => {
  try {
    const types = await ListingType.findAll();

    return res.status(200).json(types);
  } catch (error) {
    handleError(error, res);
  }
};

export const locationAutoComplete = async (req, res) => {
  try {
    const { query } = req.query;

    const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
    const LOCATION_API_HOST = process.env.LOCATION_API_HOST;
    const LOCATION_API_LINK = process.env.LOCATION_API_LINK;

    if (!query)
      return res.status(400).json({ error: "Input query is required." });

    const response = await axios.get(`${LOCATION_API_LINK}?input=${query}`, {
      headers: {
        "x-rapidapi-host": LOCATION_API_HOST,
        "x-rapidapi-key": LOCATION_API_KEY,
      },
    });

    return res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.user;

    const {
      listingId,
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      listingTypeId,
      images,
      thumbnail,
    } = req.body;

    if (!listingId)
      return res
        .status(400)
        .json({ message: "Listing ID is required to edit." });

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !bedrooms ||
      !bathrooms ||
      !listingTypeId ||
      !images
    )
      return res.status(400).json({ message: "All fields are required." });

    const listingType = await ListingType.findByPk(listingTypeId);

    if (!listingType)
      return res.status(400).json({ message: "Listing type not found." });

    const listing = await Listing.findByPk(listingId);

    if (!listing)
      return res.status(404).json({ message: "Listing not found." });

    if (listing.userId !== id)
      return res.status(401).json({ message: "Listing can't be edited." });

    const newImageUrls = req.files?.map((file) => file.path);

    if (newImageUrls?.length > 0) {
      images = images.concat(newImageUrls);
    }

    // Update the listing
    await Listing.update(
      {
        title,
        description,
        price,
        location,
        bedrooms,
        bathrooms,
        listingTypeId,
        images,
        thumbnail,
      },
      { where: { id: listingId }, returning: true }
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
    const { id: userId } = req.user;

    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Listing ID not found." });

    const listing = await Listing.findByPk(id);

    if (!listing)
      return res.status(404).json({ message: "Listing not found." });

    if (listing.userId !== userId)
      return res.status(401).json({ message: "Listing can't be deleted." });

    await Listing.destroy({ where: { id: listing.id } });

    return res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

export const getListingsByViews = async (req, res) => {
  try {
    const { limit } = req.query;

    if (limit) {
      // Ensure count is a valid number
      const check = parseInt(limit, 10);
      if (isNaN(check) || limit <= 0) {
        return res.status(400).json({ message: "Invalid limit parameter." });
      }
    }

    const listings = await Listing.findAll({
      order: [["views", "DESC"]], // Order by views in descending order
      limit: limit ?? null, // Limit to the specified number of listings
    });

    return res.status(200).json(listings);
  } catch (error) {
    handleError(error, res);
  }
};

// To increase the views of a listing when user clicks on it
export const handleListingClick = async (req, res) => {
  try {
    const { id } = req.params;

    const { id: userId } = req.user;

    const listing = await Listing.findByPk(id);

    if (!listing)
      return res.status(404).json({ message: "Listing not found." });

    if (listing.userId === userId)
      return res.status(200).json({ message: "This user posted the listing." });

    // Update the listing
    await Listing.update(
      {
        views: listing.views + 1,
      },
      { where: { id } }
    );

    return res.status(200).json({ message: "Increased listing view." });
  } catch (error) {
    handleError(error, res);
  }
};

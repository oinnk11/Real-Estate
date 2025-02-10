import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js"; // Import cloudinary configuration

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "listings", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
    transformation: [
      { width: 800, height: 800, crop: "limit" }, // Resizes images before upload
    ],
  },
});

const upload = multer({
  storage,
});

export default upload;

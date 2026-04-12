import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "school_admissions",
    allowed_formats: ["jpg", "png", "pdf"],
  },
});

export const upload = multer({ storage });
import express from "express";
import { protect } from "../middleware/protectedMiddleware.js";
import { uploadGalleryFiles } from "../middleware/galleryUpload.js";
import {
  createGallery,
  getGallery,
  getGalleryImages,
  getGalleryImage,
  updateGallery,
  deleteGallery,
  uploadImagesToGallery,
  deleteSingleImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.get("/:id/images", getGalleryImages);
router.get("/:galleryId/image/:imageId", getGalleryImage);
router.post("/", protect, createGallery);
router.put("/:id", protect, updateGallery);
router.delete("/:id", protect, deleteGallery);
router.post(
  "/upload/:id",
  protect,
  uploadGalleryFiles,
  uploadImagesToGallery
);
router.delete(
  "/:galleryId/image/:imageId",
  protect,
  deleteSingleImage
);

export default router;
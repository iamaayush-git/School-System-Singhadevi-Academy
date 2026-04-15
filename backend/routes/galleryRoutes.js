import express from "express";
import { protect } from "../middleware/protectedMiddleware.js";
import { uploadGallery } from "../middleware/galleryUpload.js";
import {
  createGallery,
  getGallery,
  updateGallery,
  deleteGallery,
  uploadImagesToGallery,
  deleteSingleImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", protect, createGallery);
router.put("/:id", protect, updateGallery);
router.delete("/:id", protect, deleteGallery);
router.post(
  "/upload/:id",
  protect,
  uploadGallery.array("images", 10),
  uploadImagesToGallery
);
router.delete(
  "/:galleryId/image/:imageId",
  protect,
  deleteSingleImage
);

export default router;
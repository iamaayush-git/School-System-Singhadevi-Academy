import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import createError from "http-errors";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

//create gallery
export const createGallery = async (req, res, next) => {
  console.log("Hello world")
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return next(createError(400, "Title is required"));
    }

    const existing = await Gallery.findOne({ title });

    if (existing) {
      return next(createError(409, "Title already exists"));
    }

    const newTitle = await Gallery.create({ title: title.trim() });

    res.status(201).json({
      success: true,
      data: newTitle,
    });

  } catch (err) {
    next(err);
  }
};


// 📥 get all
export const getGallery = async (req, res, next) => {
  // return res.send("Hello world")
  try {
    const galleries = await Gallery.find()
      .sort({ createdAt: -1 })
      .lean();
    if (!galleries) {
      return next(createError(404, "Gallery not found"));
    }

    res.status(200).json({
      success: true,
      count: galleries.length,
      data: galleries,
    });

  } catch (err) {
    next(createError(500, err.message));
  }
};

//update gallery title
export const updateGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // ✅ validate input
    if (!title || !title.trim()) {
      return next(createError(400, "Title is required"));
    }

    const normalizedTitle = title.trim();

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return next(createError(404, "Gallery not found"));
    }

    const existing = await Gallery.findOne({
      title: { $regex: new RegExp(`^${normalizedTitle}$`, "i") },
      _id: { $ne: id }, // exclude current document
    });

    if (existing) {
      return next(createError(409, "Title already exists"));
    }

    const updated = await Gallery.findByIdAndUpdate(
      id,
      { title: normalizedTitle },
      { new: true, runValidators: true }
    ).lean();

    res.status(200).json({
      success: true,
      message: "Title updated successfully",
      data: updated,
    });

  } catch (err) {
    next(createError(500, err.message));
  }
};

// delete whole gallery
export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return next(createError(404, "Gallery not found"));
    }

    // Delete all images from Cloudinary
    if (gallery.images && gallery.images.length > 0) {
      for (const img of gallery.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    // Delete gallery from DB
    await Gallery.findByIdAndDelete(id);

    // Response
    res.status(200).json({
      success: true,
      message: "Gallery and all images deleted successfully",
    });

  } catch (err) {
    next(createError(500, err.message));
  }
};

export const uploadImagesToGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Find gallery
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return next(createError(404, "Gallery not found"));
    }

    // 2. Check files
    if (!req.files || req.files.length === 0) {
      return next(createError(400, "No images uploaded"));
    }

    // 3. Upload to Cloudinary (clean version)
    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, "gallery")
    );

    const uploadedImages = await Promise.all(uploadPromises);

    // 4. Save to DB
    gallery.images.push(...uploadedImages);
    await gallery.save();

    // 5. Response
    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: gallery,
    });

  } catch (err) {
    console.error("Gallery Upload Error:", err);

    return next(
      createError(500, err.message || "Internal Server Error")
    );
  }
};
//delete single image
export const deleteSingleImage = async (req, res, next) => {
  try {
    const { galleryId, imageId } = req.params;

    //Find gallery
    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return next(createError(404, "Gallery not found"));
    }

    // Find image inside gallery
    const image = gallery.images.find(
      (img) => img._id.toString() === imageId
    );

    if (!image) {
      return next(createError(404, "Image not found"));
    }

    // Delete from Cloudinary
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Remove from MongoDB array
    gallery.images = gallery.images.filter(
      (img) => img._id.toString() !== imageId
    );

    await gallery.save();

    // Response
    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: gallery,
    });

  } catch (err) {
    next(createError(500, err.message));
  }
};
import Gallery from "../models/Gallery.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import createError from "http-errors";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const THUMBNAIL_WIDTH = 300;
const MEDIUM_WIDTH = 800;
const DEFAULT_PAGE_SIZE = 24;
const MAX_PAGE_SIZE = 30;

const getPageSize = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_PAGE_SIZE) {
    throw createError(400, `Page size must be between 1 and ${MAX_PAGE_SIZE}`);
  }
  return parsed;
};

const getSkip = (value) => {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > 2147483647) {
    throw createError(400, "Image offset must be a non-negative integer");
  }
  return parsed;
};

const getOptimizedImage = (image) => {
  const thumbnailUrl = image.public_id
    ? cloudinary.url(image.public_id, {
        secure: true,
        transformation: [
          {
            width: THUMBNAIL_WIDTH,
            height: THUMBNAIL_WIDTH,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      })
    : image.url;
  const mediumUrl = image.public_id
    ? cloudinary.url(image.public_id, {
        secure: true,
        transformation: [
          {
            width: MEDIUM_WIDTH,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      })
    : image.url;

  return {
    _id: image._id,
    url: thumbnailUrl,
    thumbnailUrl,
    mediumUrl,
    width: image.width || THUMBNAIL_WIDTH,
    height: image.height || THUMBNAIL_WIDTH,
  };
};

const isValidImageBuffer = (file) => {
  const { buffer, mimetype } = file;
  if (mimetype === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimetype === "image/png") {
    return buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    );
  }
  if (mimetype === "image/webp") {
    return (
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }
  return false;
};

//create gallery
export const createGallery = async (req, res, next) => {
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
  try {
    if (req.query.limit !== undefined) {
      const limit = getPageSize(req.query.limit);
      const galleries = await Gallery.aggregate([
        { $sort: { createdAt: -1, _id: -1 } },
        {
          $project: {
            title: 1,
            createdAt: 1,
            imageCount: { $size: { $ifNull: ["$images", []] } },
            images: {
              $map: {
                input: {
                  $slice: [{ $ifNull: ["$images", []] }, limit],
                },
                as: "image",
                in: {
                  _id: "$$image._id",
                  url: "$$image.url",
                  public_id: "$$image.public_id",
                  width: "$$image.width",
                  height: "$$image.height",
                },
              },
            },
          },
        },
      ]);
      const data = galleries.map((gallery) => ({
        ...gallery,
        images: gallery.images.map(getOptimizedImage),
        nextSkip: gallery.images.length,
      }));

      res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    }

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
    next(err.status ? err : createError(500, err.message));
  }
};

export const getGalleryImages = async (req, res, next) => {
  try {
    const limit = getPageSize(req.query.limit ?? DEFAULT_PAGE_SIZE);
    const skip = getSkip(req.query.skip ?? 0);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "Invalid gallery ID"));
    }

    const [gallery] = await Gallery.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $project: {
          imageCount: { $size: { $ifNull: ["$images", []] } },
          images: {
            $map: {
              input: {
                $slice: [{ $ifNull: ["$images", []] }, skip, limit],
              },
              as: "image",
              in: {
                _id: "$$image._id",
                url: "$$image.url",
                public_id: "$$image.public_id",
                width: "$$image.width",
                height: "$$image.height",
              },
            },
          },
        },
      },
    ]);

    if (!gallery) return next(createError(404, "Gallery not found"));

    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.status(200).json({
      success: true,
      data: {
        images: gallery.images.map(getOptimizedImage),
        imageCount: gallery.imageCount,
        nextSkip: skip + gallery.images.length,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getGalleryImage = async (req, res, next) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.galleryId) ||
      !mongoose.Types.ObjectId.isValid(req.params.imageId)
    ) {
      return next(createError(400, "Invalid gallery or image ID"));
    }

    const gallery = await Gallery.findOne({
      _id: req.params.galleryId,
      "images._id": req.params.imageId,
    })
      .select({ "images.$": 1 })
      .lean();

    if (!gallery) return next(createError(404, "Image not found"));

    const image = gallery.images[0];
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.status(200).json({
      success: true,
      data: {
        originalUrl: image.url,
        mediumUrl: getOptimizedImage(image).mediumUrl,
        width: image.width,
        height: image.height,
      },
    });
  } catch (err) {
    next(err);
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
  let uploadedImages = [];
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return next(createError(400, "No images uploaded"));
    }

    if (!req.files.every(isValidImageBuffer)) {
      return next(createError(400, "Uploaded file content is not a supported image"));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid gallery ID"));
    }

    const exists = await Gallery.exists({ _id: id });
    if (!exists) return next(createError(404, "Gallery not found"));

    const results = await Promise.allSettled(
      req.files.map((file) => uploadToCloudinary(file.buffer, "gallery"))
    );
    uploadedImages = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    const failedUpload = results.find((result) => result.status === "rejected");
    if (failedUpload) throw failedUpload.reason;

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { $push: { images: { $each: uploadedImages } } },
      { new: true, runValidators: true }
    );

    if (!gallery) {
      await Promise.all(
        uploadedImages.map((image) =>
          cloudinary.uploader.destroy(image.public_id)
        )
      );
      uploadedImages = [];
      return next(createError(404, "Gallery not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: gallery,
    });

  } catch (err) {
    console.error("Gallery Upload Error:", err);

    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map((image) =>
          cloudinary.uploader.destroy(image.public_id)
        )
      );
    }

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
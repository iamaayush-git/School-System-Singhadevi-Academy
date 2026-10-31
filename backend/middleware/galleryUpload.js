import multer from "multer";
import createError from "http-errors";

const storage = multer.memoryStorage();

export const uploadGallery = multer({
  storage,
  limits: {
    fileSize: 6 * 1024 * 1024, // 6MB per image
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only images allowed"));
    }

    cb(null, true);
  },
});

export const uploadGalleryFiles = (req, res, next) => {
  uploadGallery.array("images", 10)(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError) {
      const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      return next(createError(status, error.message));
    }

    return next(createError(400, error.message));
  });
};
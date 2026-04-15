import multer from "multer";

const storage = multer.memoryStorage();

export const uploadGallery = multer({
  storage,
  limits: {
    fileSize: 6 * 1024 * 1024, // 6MB per image
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only images allowed"));
    }

    cb(null, true);
  },
});
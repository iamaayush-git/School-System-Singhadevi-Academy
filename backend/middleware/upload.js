import multer from "multer";

const storage = multer.memoryStorage();

export const uploadAdmission = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB (documents can be bigger)
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only images and PDF allowed"));
    }

    cb(null, true);
  },
});
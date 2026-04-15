import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        url: String,
        public_id: String, // for delete from cloudinary
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
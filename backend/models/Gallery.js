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
        width: Number,
        height: Number,
        format: String,
        bytes: Number,
      },
    ],
  },
  { timestamps: true }
);

gallerySchema.index({ createdAt: -1, _id: -1 });

export default mongoose.model("Gallery", gallerySchema);
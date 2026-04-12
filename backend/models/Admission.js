import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    seeCertificate: {
      type: String, // file URL or path
      required: true,
    },
    birthCertificate: {
      type: String, // file URL or path
      required: true,
    },
    additionalDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admission", admissionSchema);
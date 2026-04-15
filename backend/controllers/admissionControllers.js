import Admission from "../models/Admission.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createAdmission = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      program,
      additionalDetails,
    } = req.body;

    // 1. Validate required fields
    if (!name || !email || !contactNumber || !program) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Validate files
    const seeCertificateFile = req.files?.seeCertificate?.[0];
    const birthCertificateFile = req.files?.birthCertificate?.[0];

    if (!seeCertificateFile || !birthCertificateFile) {
      return res.status(400).json({
        message: "Both certificates are required",
      });
    }

    // 3. Upload to Cloudinary
    const seeCertificateUpload = await uploadToCloudinary(
      seeCertificateFile.buffer,
      "admission"
    );

    const birthCertificateUpload = await uploadToCloudinary(
      birthCertificateFile.buffer,
      "admission"
    );

    // 4. Save to DB
    const admission = await Admission.create({
      name,
      email,
      contactNumber,
      program,
      additionalDetails,
      seeCertificate: seeCertificateUpload.url,
      birthCertificate: birthCertificateUpload.url,
    });

    return res.status(201).json({
      success: true,
      message: "Admission submitted successfully",
      data: admission,
    });
  } catch (error) {
    console.error("Admission Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get all admissions
export const getAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find()
      .sort({ createdAt: -1 })
      .lean(); // faster read performance

    return res.status(200).json({
      success: true,
      count: admissions.length,
      admissions,
    });
  } catch (error) {
    console.error("GET_ADMISSIONS_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admissions",
    });
  }
};
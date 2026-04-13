import Admission from "../models/Admission.js";
// create admission
export const createAdmission = async (req, res) => {
  try {
    const { name, email, contactNumber, program, additionalDetails } = req.body;

    if (!name || !email || !contactNumber || !program) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const { seeCertificate, birthCertificate } = req.files;
    if (!seeCertificate || !birthCertificate) {
      return res.status(400).json({ message: "All files are required" });
    }
    const admission = await Admission.create({
      name,
      email,
      contactNumber,
      program,
      additionalDetails,
      seeCertificate: req.files?.seeCertificate?.[0]?.path,
      birthCertificate: req.files?.birthCertificate?.[0]?.path,
    });

    return res.status(201).json(admission);

  } catch (error) {
    res.status(500).json({ message: error.message });
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
import express from "express";
import { createAdmission, getAdmissions } from "../controllers/admissionControllers.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/protectedMiddleware.js";

const router = express.Router();

router.post("/create", upload.fields([{ name: "seeCertificate", maxCount: 1 }, { name: "birthCertificate", maxCount: 1 }]), createAdmission);
router.get("/all", protect, getAdmissions);

export default router;
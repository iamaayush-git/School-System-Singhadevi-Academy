import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import admissionRoutes from "./routes/admissionRoutes.js"
import galleryRoutes from "./routes/galleryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js"
dotenv.config();


const app = express();

// middleware
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "*",
}));
app.use(express.json());

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });

// routes
app.get("/api/health", (req, res) => {
  res.send("success");
});

app.use("/api/admissions", admissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);


//error handling
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
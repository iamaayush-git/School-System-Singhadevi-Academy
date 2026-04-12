import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import admissionRoutes from "./routes/admissionRoutes.js"
import path from "path";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();

// middleware
app.use("/uploads", express.static("uploads"));
app.use(cors());
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
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/admissions", admissionRoutes);
app.use("/api/admin", adminRoutes);



// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
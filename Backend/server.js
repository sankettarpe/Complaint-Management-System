import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import { protect, authorize } from "./middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials:true
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Complaint Management Backend Running..."
    });
});

const PORT=process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/admin",protect,authorize("admin"),adminRoutes);
app.use("/api/superadmin",protect,authorize("superadmin"),superAdminRoutes);

// app.use("/api/admin", adminRoutes);
// app.use("/api/super-admin", superAdminRoutes);

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
});
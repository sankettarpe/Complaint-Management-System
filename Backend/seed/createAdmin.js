import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

await connectDB();

const hashedPassword = await bcrypt.hash("Admin@123", 10);

await User.create({
  name: "Sanket Admin",
  email: "sanketadmin@gmail.com",
  phone: "9970302922",
  password: hashedPassword,
  role: "admin",
});

console.log("Admin Created");
process.exit();
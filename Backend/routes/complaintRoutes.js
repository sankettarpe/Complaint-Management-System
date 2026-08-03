import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  submitComplaint,
  getMyComplaints,
  getUserDashboard,
} from "../controllers/complaintControllers.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/submit",
  protect,
  authorize("user"),
  upload.single("image"),
  submitComplaint,
);
router.get("/my-complaints", protect, authorize("user"), getMyComplaints);
router.get("/dashboard", protect, authorize("user"), getUserDashboard);

export default router;

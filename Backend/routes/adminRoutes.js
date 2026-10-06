import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  adminDashboard,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  assignStaff,
  getComplaintById,
  reviewDuplicateComplaint,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), adminDashboard);

router.get("/all-complaints", protect, authorize("admin"), getAllComplaints);

router.put(
  "/update-status/:id",
  protect,
  authorize("admin", "superadmin"),
  updateComplaintStatus,
);

router.put(
  "/update-staff/:id",
  protect,
  authorize("admin", "superadmin"),
  updateStaff,
);

router.delete(
  "/delete-staff/:id",
  protect,
  authorize("admin", "superadmin"),
  deleteStaff,
);

router.delete(
  "/delete/:id",
  protect,
  authorize("admin", "superadmin"),
  deleteComplaint,
);

router.put(
    "/assign-staff/:complaintId",
    protect,
    authorize("admin","superadmin"),
    assignStaff
);

router.put(
  "/review-duplicate/:id",
  protect,
  authorize("admin"),
  reviewDuplicateComplaint
);

router.get(
  "/complaints/:id",
  protect,
  authorize("admin"),
  getComplaintById
);

router.post("/add-staff", protect, authorize("admin"), addStaff);

router.get("/staff", protect, authorize("admin"), getStaff);

export default router;

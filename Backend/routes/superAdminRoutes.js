import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { superAdminDashboard, createAdmin, deleteAdmin, getAdminActivity } from "../controllers/superAdminControllers.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("superadmin"), superAdminDashboard);

router.post("/create-admin", protect, authorize("superadmin"), createAdmin);

router.delete(
  "/delete-admin/:id",
  protect,
  authorize("superadmin"),
  deleteAdmin,
);

router.get(
  "/admin-activity",
  protect,
  authorize("superadmin"),
  getAdminActivity,
);

export default router;

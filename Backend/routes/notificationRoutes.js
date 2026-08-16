import express from "express";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin"),
  getNotifications
);

router.put(
  "/:id/read",
  protect,
  authorize("admin"),
  markNotificationAsRead
);

router.put(
  "/read-all",
  protect,
  authorize("admin"),
  markAllNotificationsAsRead
);

export default router;
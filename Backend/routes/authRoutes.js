import express from "express";
import { register, login, forgotPassword, resetPassword } from "../controllers/authControllers.js";
import {
  registerValidation,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);

router.post("/login", login);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;

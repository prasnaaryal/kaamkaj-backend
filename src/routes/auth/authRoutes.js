import express from "express";
import {
  changePassword,
  login,
  register,
  requestPasswordReset,
  resetPassword,
} from "../../controllers/auth/authController.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;

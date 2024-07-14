import express from "express";
import upload from "../../services/uploadService.js";
import {
  getUserDetails,
  updateCompany,
  updateProfile,
} from "../../controllers/user/userController.mjs";
import { authenticateToken } from "../../middleware/index.js";

const router = express.Router();
router.get("/load-user", authenticateToken, getUserDetails); // localhost:9000/api/user/load-user
router.put(
  "/update-profile/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  updateProfile
);

router.put(
  "/update-company/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateCompany
);

export default router;

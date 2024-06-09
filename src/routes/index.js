import express from "express";

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login

export default router;

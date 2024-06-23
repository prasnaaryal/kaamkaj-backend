import express from "express";

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";
import userRoutes from "./user/userRoutes.js";
import jobRoutes from "./job/jobRoutes.js";
import categoryRoutes from "./category/categoryRoutes.js";
import employmentTypeRoutes from "./employmentType/employmentTypeRoutes.js";
import experienceLevelRoutes from "./experienceLevel/experienceLevelRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login
router.use("/job", jobRoutes); // localhost:9000/api/job
router.use("/category", categoryRoutes); // localhost:9000/api/category
router.use("/experienceLevel", experienceLevelRoutes); // localhost:9000/api/experienceLevel
router.use("/employmentType", employmentTypeRoutes); // localhost:9000/api/employmentType
router.use("/user", userRoutes); // localhost:9000/api/user/load-user

export default router;
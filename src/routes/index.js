import express from "express";

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";
import jobRoutes from "./job/jobRoutes.js";
import categoryRoutes from "./category/categoryRoutes.js" // Use the imported routes const router = express.Router();



const router = express.Router();

router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login
router.use("/job", jobRoutes); // localhost:9000/api/job
router.use("/category", categoryRoutes); // localhost:9000/api/category


export default router;

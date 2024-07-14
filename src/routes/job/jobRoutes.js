import express from "express";

// Import the relevant controllers
import {
  createJob,
  getAllJobs,
  getJobsByQuery,
  deleteJob,
  updateJob,
  getJobsById,
  getJobsByEmail,
  getJobsByCompany,
  applyJob,
  saveFavoriteJob,
  getFavoriteJobs,
  getAppliedJobsByUserController,
  getAllAppliedJobs,
  getAppliedJobByIdController,
  getJobsByCompanyName,
  unsaveFavoriteJob,
} from "../../controllers/job/jobController.mjs";
import { authenticateToken } from "../../middleware/index.js";
// Multer Configuration

const router = express.Router();
// Define the routes

router.post("/create-job", authenticateToken, createJob);
router.get("/getalljobs", getAllJobs);
router.post("/search", getJobsByQuery);
router.get("/:jobId", getJobsById);
router.delete("/delete/:jobId", authenticateToken, deleteJob);
router.put("/update-job/:jobId", authenticateToken, updateJob);
router.get("/user/:email", getJobsByEmail); // New route for fetching jobs by email
router.get("/job/company", authenticateToken, getJobsByCompany);
router.post("/apply", authenticateToken, applyJob);
router.post("/getallappliedjobs", authenticateToken, getAllAppliedJobs);
router.post(
  "/get-applied-job-by-id/:jobId",
  authenticateToken,
  getAppliedJobByIdController
);
router.post(
  "/get-applied-job-by-user",
  authenticateToken,
  getAppliedJobsByUserController
);
router.get("/favorite/getall", authenticateToken, getFavoriteJobs);
router.post("/favorite/save", authenticateToken, saveFavoriteJob);
router.get("/company/:companyName", getJobsByCompanyName);
router.post("/favorite/unsave", authenticateToken, unsaveFavoriteJob);

export default router;

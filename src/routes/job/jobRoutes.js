import express from 'express';

// Import the relevant controllers
import {
  createJob,
  getAllJobs,
  getJobsByQuery,
  deleteJob,
  updateJob,
  getJobsById,
  getJobsByEmail

} from '../../controllers/job/jobController.mjs';
import { authenticateToken } from '../../middleware/index.js';
// Multer Configuration

const router = express.Router();
// Define the routes

router.post('/create-job', authenticateToken,  createJob);
router.get('/getalljobs', getAllJobs);
router.post('/search', getJobsByQuery);
router.get('/:jobId', getJobsById);
router.delete('/:jobId', authenticateToken, deleteJob);
router.put('/update-job/:jobId', authenticateToken,  updateJob);
router.get('/user/:email', getJobsByEmail); // New route for fetching jobs by email


export default router;

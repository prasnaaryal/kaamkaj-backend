import express from 'express';

// Import the relevant controllers
import {
  createJob,
  getAllJobs,
  getJobsByQuery,
  deleteJob,
  updateJob,
  getJobsById,
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
router.put('/:jobId', authenticateToken,  updateJob);

export default router;

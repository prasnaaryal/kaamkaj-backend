import express from "express";

// import { getAllexperienceLevels } from "../../services/experienceLevel/experienceLevelServices.js";
import { getAllExperiencelevel } from "../../controllers/experienceLevel/experiencelevelController.js";

const router = express.Router();

router.get("/", getAllExperiencelevel);

export default router;
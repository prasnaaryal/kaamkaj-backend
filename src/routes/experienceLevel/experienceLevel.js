import express from "express";

import { getAllexperinceLevels } from "../../services/experienceLevel/experienceLevelServices.js";

const router = express.Router();

router.get("/", getAllexperinceLevels);

export default router;

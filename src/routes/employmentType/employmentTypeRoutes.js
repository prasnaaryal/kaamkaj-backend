import express from "express";

import { getAllemploymentTypes } from "../../services/employmentType/employmentTypeServices.js";

const router = express.Router();

router.get("/", getAllemploymentTypes);

export default router;

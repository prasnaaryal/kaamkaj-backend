import express from "express";
import { getAllemploymentTypes } from "../../controllers/employmentType/employmentTypeController.js";

const router = express.Router();

router.get("/", getAllemploymentTypes);

export default router;
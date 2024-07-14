import * as ExperiencelevelService from "../../services/experienceLevel/experienceLevelServices.js";

export const getAllExperiencelevel = (req, res) => {
  try {
    const experienceLevel = ExperiencelevelService.getAllexperienceLevels();
    res.status(201).json({ count: experienceLevel.length, experienceLevels: experienceLevel });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
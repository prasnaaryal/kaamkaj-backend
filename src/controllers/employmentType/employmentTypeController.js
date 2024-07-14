import * as EmploymentTypeService from "../../services/employmentType/employmentTypeServices.js";

export const getAllemploymentTypes = (req, res) => {
  try {
    const employmentType = EmploymentTypeService.getAllemploymentTypes();
    res
      .status(201)
      .json({ count: employmentType.length, employmentTypes: employmentType });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
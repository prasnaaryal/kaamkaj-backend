// Schema is a class that allows us to represent a collection of fields

import { Schema, model } from "mongoose";
import categories from "../utils/categories.js";
import experienceLevels from "../utils/experienceLevels.js";
import employmentTypes from "../utils/employmentTypes.js";

const jobSchema = new Schema({
  companyName: { type: String, required: true },
  category: {
    type: String,
    enum: categories,
    required: true,
  },
  jobTitle: { type: String, required: true },
  jobLocation: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: experienceLevels,
    required: true,
  },
  companyLogo: { type: String, default: "" },
  employmentType: {
    type: String,
    enum: employmentTypes,
    required: true,
  },
  responsibilities: { type: String, required: true },
  requirements: { type: String, required: true },
  postingDate: { type: Date, default: Date.now },
  minSalary: { type: String, required: true },
  maxSalary: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
});

export default model("Job", jobSchema);

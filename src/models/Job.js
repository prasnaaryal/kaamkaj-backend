// Schema is a class that allows us to represent a collection of fields
import { Schema, model } from "mongoose";
import categories from "../utils/categories.js";
import experienceLevels from "../utils/experienceLevels.js";
import employmentTypes from "../utils/employementTypes.js";

const jobSchema = new Schema({
  companyName: String,
  category: {
    type: String,
    enum: categories,
  },
  jobTitle: String,
  jobLocation: String,
  experienceLevel: {
    type: String,
    enum: experienceLevels,
  },
  companyLogo:String,
  employmentType: {
    type: String,
    enum: employmentTypes,
  },

  responsibilites: String,
  postingDate:String,
  minSalary: String,
  maxSalary: String,
  description: String,
  postedBy:String,

});

export default model("Job", jobSchema);

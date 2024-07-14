import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length is 6"],
    select: false,
    match: [
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/,
      "Password must have uppercase, lowercase, and special character.",
    ],
  },
  image: {
    type: String,
    default: null,
  },
  resetToken: {
    type: String,
    select: false,
    default: null,
  },
  resetTokenExpiration: {
    type: Date,
    default: null,
    select: false,
  },
  role: {
    type: String,
    enum: ["company", "applicant"],
    default: "applicant",
  },
  title: {
    type: String,
    default: "",
  },
  personalWebsite: {
    type: String,
    default: "",
  },
  cv: {
    type: String,
    default: "",
  },
  companyAddress: {
    type: String,
    default: "",
  },
  companyWebsite: {
    type: String,
    default: "",
  },
  aboutUs: {
    type: String,
    default: "",
  },
  favoriteJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }], // Array of Job references
});

userSchema.index({ email: 1 }, { unique: true });

export default model("User", userSchema);

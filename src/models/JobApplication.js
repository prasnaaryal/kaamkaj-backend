import { Schema, model } from "mongoose";

const jobApplicationSchema = new Schema({
  applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["applied", "under review", "interviewed", "rejected", "accepted"],
    default: "applied",
  },
});

export default model("JobApplication", jobApplicationSchema);

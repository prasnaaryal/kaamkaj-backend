import { Schema, model } from "mongoose";

const appliedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      populate: ["fullName", "email"],
    },
    jobs: [
      {
        job: {
          type: Schema.Types.ObjectId,
          ref: "Job",
        },
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "inTransit", "delivered"],
      default: "pending",
    },
   
    appliedStatus: {
      type: String,
      enum: ["pending", "failed", "success"],
      default: "pending",
    },
    
  },
  { timestamps: true }
);

export default model("Applied", appliedSchema);
import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },
    route: String,
    algorithm: {
      type: String,
      enum: [
        "fixed_window",
        "sliding_window",
        "token_bucket",
        "leaky_bucket"
      ]
    },
    limit: Number,
    window: Number
  },
  {
    timestamps: true
  }
);
export default mongoose.model("RateLimitRule", ruleSchema);





import mongoose from "mongoose";

const analyticsSchema =
new mongoose.Schema({

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  route: String,

  identifier: String,

  algorithm: String,

  allowed: Boolean,

  timestamp: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

export default mongoose.model(
  "Analytics",
  analyticsSchema
);
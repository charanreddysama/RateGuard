import mongoose from "mongoose";


const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);




import mongoose from "mongoose";

const DrugSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }
  },
  { timestamps: true }
);

const drugModel = mongoose.models.Drug || mongoose.model("Drug", DrugSchema);
export default drugModel

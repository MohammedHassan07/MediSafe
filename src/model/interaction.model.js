import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema(
  {
    drug1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drug",
      required: true,
    },
    drug2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drug",
      required: true,
    },
    severity: {
      type: String,
      enum: ["mild", "moderate", "severe"],
      required: true,
    },
    description: { type: String, required: true }, 
    management: { type: String }, 
    imageURL: { type: String }, 
  },
  { timestamps: true }
);

// Ensure no duplicate pairs (drug1–drug2 vs drug2–drug1)
InteractionSchema.index({ drug1: 1, drug2: 1 }, { unique: true });

const interactionModel =  mongoose.models.Interaction || mongoose.model("Interaction", InteractionSchema);

export default interactionModel
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
    adr: String,
    imageURL: { type: String },
  },
  { timestamps: true }
);

// Always enforce drug1 < drug2
InteractionSchema.pre("save", function (next) {
  if (this.drug1.toString() > this.drug2.toString()) {
    const temp = this.drug1
    this.drug1 = this.drug2
    this.drug2 = temp
  }
  next()
})

// unique index
InteractionSchema.index({ drug1: 1, drug2: 1 }, { unique: true })

const interactionModel = mongoose.models.Interaction || mongoose.model("Interaction", InteractionSchema);

export default interactionModel
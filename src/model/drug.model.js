import mongoose from "mongoose";

const DrugSchema = new mongoose.Schema(
  {

    drugName: { type: String, required: true, unique: true },
    molecularFormula: String,
    IUPAC_Name: String,
    description: String,
    mechanism: String,
    uses: String,
    adverseEffect: String,
    drugImage: String,
    ADRC: String,
    management: String,
  },
  { timestamps: true }
);

const drugModel = mongoose.models.Drug || mongoose.model("Drug", DrugSchema);
export default drugModel

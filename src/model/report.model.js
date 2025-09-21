import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        age: { type: Number, required: true },
        sex: {
            type: String,
            required: true,
        },
        localId: {
            type: String,
            required: true,
        },
        medicalHistory: {
            type: String,
            required: true,
        },
        drugName: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            enum: ["mild", "moderate", "severe"],
            required: true,
        },
        dosage: { type: String, required: true },
        batchNumber: { type: String, required: true },

        startDate: { type: Date },
        stopDate: { type: Date },
        changeDose: { type: String, required: true },
        symptoms: { type: String },
        onset: { type: String },
        duration: { type: String },
        treatment: { type: String },
    },

    { timestamps: true }
);

const reportModel = mongoose.models.report || mongoose.model("report", reportSchema);
                // mongoose.models.Interaction || mongoose.model("Interaction", InteractionSchema);

export default reportModel
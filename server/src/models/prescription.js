import mongoose from "mongoose";
const { Schema } = mongoose;

const prescriptionSchema = new Schema(
  {
    examinationNote: {
      notes: String,
      diagnosis: String,
    },
    medications: [
      {
        name: { type: String },
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String,
      },
    ],
    test: [
      {
        name: String,
        urgency: String,
        reason: String,
      },
    ],
    note: String,
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;

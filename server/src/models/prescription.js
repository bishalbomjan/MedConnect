import mongoose from "mongoose";
const { Schema } = mongoose;

const prescriptionSchema = new Schema(
  {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medications: [
      {
        name: { type: String, required: true },
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String,
      },
    ],
    notes: String,
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;

import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fullname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isKycSubmitted: { type: Boolean, default: false },
  isKycApproved: { type: Boolean, default: false },
});

const Patient = mongoose.model("PatientKyc", patientSchema);

export default Patient;

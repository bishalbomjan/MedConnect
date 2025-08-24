import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fullname: { type: String, required: true },
  degree: { type: String, required: true },
  NMCID: { type: String, required: true },
  specializations: { type: [String], required: true },
  experience: String,
  experienceYear: String,
  price: { type: Number, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isKycSubmitted: { type: Boolean, default: false },
  isKycApproved: { type: Boolean, default: false },
  uploadFiles: { type: String, required: false },
});
const Doctor = mongoose.model("DoctorKyc", doctorSchema);
export default Doctor;

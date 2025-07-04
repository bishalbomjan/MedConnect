import mongoose from "mongoose";
const { Schema } = mongoose;
const doctorSchema = new Schema({
  fullname: { type: String, required: true },
  degree: { type: String, required: true },
  NMCID: { type: String, required: true },
  specializations: { type: [String], required: true },
  experience: [
    {
      body: String,
      date: Date,
    },
  ],
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isKycSubmitted: { type: Boolean, default: false },
  isKycApproved: { type: Boolean, default: false },
});
const Doctor = mongoose.model("DoctorKyc", doctorSchema);
export default Doctor;

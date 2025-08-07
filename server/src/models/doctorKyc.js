import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  experienceYear: String,
  price: { type: Number, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isKycSubmitted: { type: Boolean, default: false },
  isKycApproved: { type: Boolean, default: false },

  // ✅ Optional profile picture field
  profilePicture: { type: String, required: false }, // You will store file path or filename here
});
const Doctor = mongoose.model("DoctorKyc", doctorSchema);
export default Doctor;

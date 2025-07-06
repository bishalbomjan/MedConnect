import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  fullname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number }, // Store age in years
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isKycSubmitted: { type: Boolean, default: false },
  isKycApproved: { type: Boolean, default: false },
});

// Pre-save hook to calculate age
patientSchema.pre("save", function (next) {
  if (this.dateOfBirth) {
    const today = new Date();
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const m = today.getMonth() - this.dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }
    this.age = age;
  }
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

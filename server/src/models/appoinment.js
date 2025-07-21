const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    bookedById: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      type: String,
      enum: [, "In Progress", "Completed", "Cancelled", "Schedual", "No Show"],
      default: "Schedual",
    },
  },
  {
    timestamps: true,
  }
);
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;

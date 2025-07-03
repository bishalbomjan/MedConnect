const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    bookedById: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled", "Booked"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;

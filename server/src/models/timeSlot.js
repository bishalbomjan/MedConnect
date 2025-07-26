// models/timeSlot.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const timeSlotSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorKyc",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // e.g., "07:00"
      required: true,
      validate: {
        validator: (v) => /^\d{2}:\d{2}$/.test(v),
        message: (props) =>
          `${props.value} is not a valid time format (HH:MM)!`,
      },
    },
    endTime: {
      type: String, // e.g., "07:40"
      required: true,
      validate: {
        validator: (v) => /^\d{2}:\d{2}$/.test(v),
        message: (props) =>
          `${props.value} is not a valid time format (HH:MM)!`,
      },
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookedById: {
      type: Schema.Types.ObjectId,
      ref: "PatientKyc",
      default: null,
    },
    status: {
      type: String,
      enum: ["In Progress", "Booked", "Completed", "Cancelled", "Schedual"],
      default: "Schedual",
    },
    prescrption: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },
  },
  { timestamps: true }
);

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

export default TimeSlot;

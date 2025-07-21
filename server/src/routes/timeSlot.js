// routes/timeSlotRoute.js
import { Router } from "express";
import TimeSlot from "../models/timeSlot.js";
import mongoose from "mongoose";

const timeSlotRoute = Router();

/**
 * Create a time slot
 * POST /timeslot/:doctorId
 * Body: { date, startTime, endTime }
 */
timeSlotRoute.post("/timeslot/:doctorId", async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const created = await TimeSlot.create({
      doctorId: req.params.doctorId,
      date,
      startTime,
      endTime,
    });
    res.send({ message: "Time slot created successfully", data: created });
  } catch (err) {
    console.error(err); // Add this to see real error
    res
      .status(500)
      .send({ error: "Failed to create time slot.", details: err.message });
  }
});

/**
 * Get all time slots
 * Optional query: ?doctorId=...&date=...
 */
timeSlotRoute.get("/timeslot", async (req, res) => {
  try {
    const filter = {};

    if (req.query.doctorId) {
      filter.doctorId = req.query.doctorId;
    }

    if (req.query.date) {
      const targetDate = new Date(req.query.date);
      // if (isNaN(targetDate.getTime())) {
      //   return res.status(400).send({ error: "Invalid date format." });
      // }
      // const nextDate = new Date(targetDate);
      // nextDate.setDate(nextDate.getDate() + 1);

      filter.date = targetDate;
    }

    const slots = await TimeSlot.find(filter)
      .sort({ date: 1, startTime: 1 })
      .populate("doctorId bookedById");

    return res.send(slots);
  } catch (err) {
    console.error("Fetch time slots error:", err);
    return res.status(500).send({ error: "Failed to fetch time slots." });
  }
});

/**
 * Book a time slot
 * PATCH /timeslot/book/:slotId/:patientId
 */
timeSlotRoute.patch("/timeslot/book/:slotId/:patientId", async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.slotId);

    if (!slot) {
      return res.status(404).send({ message: "Time slot not found." });
    }
    if (slot.isBooked) {
      return res.status(400).send({ message: "Time slot is already booked." });
    }

    slot.isBooked = true;
    slot.bookedById = req.params.patientId;
    await slot.save();

    res.send({ message: "Time slot booked successfully.", data: slot });
  } catch (err) {
    res.status(500).send({ error: "Failed to book time slot." });
  }
});

/**
 * Delete a time slot
 * DELETE /timeslot/:slotId
 */
timeSlotRoute.delete("/timeslot/:slotId", async (req, res) => {
  try {
    const deleted = await TimeSlot.findByIdAndDelete(req.params.slotId);
    if (!deleted) {
      return res.status(404).send({ message: "Time slot not found." });
    }
    res.send({ message: "Time slot deleted successfully." });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete time slot." });
  }
});

/**
 * Unbook (cancel) a time slot
 * PATCH /timeslot/unbook/:slotId
 */
timeSlotRoute.patch("/timeslot/unbook/:slotId", async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.slotId);
    if (!slot) {
      return res.status(404).send({ message: "Time slot not found." });
    }
    if (!slot.isBooked) {
      return res.status(400).send({ message: "Time slot is not booked." });
    }

    slot.isBooked = false;
    slot.bookedById = null;
    await slot.save();

    res.send({ message: "Time slot unbooked successfully.", data: slot });
  } catch (err) {
    res.status(500).send({ error: "Failed to unbook time slot." });
  }
});

export default timeSlotRoute;

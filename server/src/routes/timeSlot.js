// routes/timeSlotRoute.js
import { Router } from "express";
import TimeSlot from "../models/timeSlot.js";

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
      doctor: req.params.doctorId,
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
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Filter by doctorId
    if (req.query.doctorId) {
      filter.doctorId = req.query.doctorId;
    }

    // Filter by date
    if (req.query.date) {
      const targetDate = new Date(req.query.date);
      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format." });
      }
      filter.date = targetDate;
    }

    // Count total time slots
    const totalAppointment = await TimeSlot.countDocuments();

    // Count booked slots where bookedById exists and is not null
    const booked = await TimeSlot.countDocuments({
      bookedById: { $exists: true, $ne: null },
    });

    // Unbooked = total - booked
    const unbooked = totalAppointment - booked;

    // Fetch paginated slots
    const slots = await TimeSlot.find(filter)
      .sort({ date: 1, startTime: 1 })
      .populate("doctorId")
      .populate({
        path: "bookedById",
        populate: { path: "patient" }, // This populates bookedById.patient
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({ slots, totalAppointment, booked, unbooked });
  } catch (err) {
    console.error("Fetch time slots error:", err);
    return res.status(500).json({ error: "Failed to fetch time slots." });
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
    slot.status = "Booked";
    await slot.save();

    res.send({ message: "Time slot booked successfully.", data: slot });
  } catch (err) {
    res.status(500).send({ error: "Failed to book time slot." });
  }
});
timeSlotRoute.patch(
  "/timeslot/cancel/:doctorId/:patientId",
  async (req, res) => {
    const filter = {
      doctorId: req.params.doctorId,
      bookedById: req.params.patientId, // Fixed this line
    };

    try {
      const slot = await TimeSlot.findOne(filter);

      if (!slot) {
        return res.status(404).send({ message: "Time slot not found." });
      }

      if (!slot.isBooked) {
        return res.status(400).send({ message: "Time slot is not booked." });
      }

      slot.isBooked = false;
      slot.bookedById = null; // Clear bookedById on cancellation
      slot.status = "Cancelled";
      await slot.save();

      res.send({ message: "Time slot canceled successfully.", data: slot });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to cancel time slot." });
    }
  }
);

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

// completed status
timeSlotRoute.patch("/timeslot/completed/:slotId", async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.slotId);
    if (!slot)
      return res
        .status(400)
        .json({ message: "Time slot for the given id is not found." });
    slot.status = "Completed";
    await slot.save();
    return res.status(200).json({ message: "Time slot updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Problem in server code." });
  }
});

export default timeSlotRoute;

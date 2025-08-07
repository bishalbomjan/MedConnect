import { Router } from "express";
import Prescription from "../models/prescription.js";
import TimeSlot from "../models/timeSlot.js";

const prescriptionRoute = Router();

prescriptionRoute.get("/prescription/:did/:pid", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      doctorId: req.params.did,
      patientId: req.params.pid,
    });
    if (!prescriptions)
      return res
        .status(404)
        .send({ message: "rescprtion with given id is not found" });
    res.send(prescriptions);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch prescriptions." });
  }
});
prescriptionRoute.get("/prescription", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.send(prescriptions);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch prescriptions." });
  }
});

prescriptionRoute.post("/prescription/:timeSlotId", async (req, res) => {
  try {
    console.log(req.body);
    const created = await Prescription.create({ ...req.body });
    const updateTimeSlot = await TimeSlot.findById(req.params.timeSlotId);
    if (!updateTimeSlot)
      return res.status(404).json({ message: "Time slot not found." });
    updateTimeSlot.prescrption = created._id;
    await updateTimeSlot.save();
    res.send({ message: "Prescription created successfully", data: created });
  } catch (err) {
    res.status(500).send({ message: "Failed to create prescription." });
  }
});

// Delete a prescription
prescriptionRoute.delete("/prescription/:id", async (req, res) => {
  try {
    const deleted = await Prescription.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Prescription not found." });
    }
    return res.send({ message: "Prescription deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete prescription." });
  }
});

export default prescriptionRoute;

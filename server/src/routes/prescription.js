import { Router } from "express";
import Prescription from "../models/prescription.js";

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

prescriptionRoute.post("/prescription", async (req, res) => {
  try {
    const created = await Prescription.create({ ...req.body });
    res.send({ message: "Prescription created successfully", data: created });
  } catch (err) {
    res.status(500).send({ error: "Failed to create prescription." });
  }
});

// Delete a prescription
prescriptionRoute.delete("/prescription/:id", async (req, res) => {
  try {
    const deleted = await Prescription.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Prescription not found." });
    }
    res.send({ message: "Prescription deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete prescription." });
  }
});

export default prescriptionRoute;

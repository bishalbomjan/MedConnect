import { Router } from "express";
import Appointment from "../models/appoinment.js";

const appoinmentRoute = Router();

appoinmentRoute.post("/appoinment/:pid/:did/", async (req, res) => {
  try {
    const created = await Appointment.create({
      bookedById: req.params.pid,
      doctorId: req.params.did,
      ...req.body,
    });
    res.send({ message: "Appointment created successfully", data: created });
  } catch (err) {
    res.status(500).send({ error: "Failed to create appointment." });
  }
});

appoinmentRoute.get("/appoinment/:did/", async (req, res) => {
  try {
    const app = await Appointment.find({ doctorId: req.params.did });
    if (!app || app.length === 0) {
      return res
        .status(404)
        .send({ message: "No appointments found for this doctor." });
    }
    res.send(app);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch appointments." });
  }
});

appoinmentRoute.get("/appoinment", async (req, res) => {
  try {
    const app = await Appointment.find();
    res.send(app);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch appointments." });
  }
});

appoinmentRoute.delete("/appoinment/:pid/:did/", async (req, res) => {
  try {
    const deleted = await Appointment.findOneAndDelete({
      doctorId: req.params.did,
      bookedById: req.params.pid,
    });
    if (!deleted) {
      return res.status(404).send({ message: "Appointment not found." });
    }
    res.send({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete appointment." });
  }
});

appoinmentRoute.patch("/appoinment/:id", async (req, res) => {
  try {
    const appoint = await Appointment.findById(req.params.id);
    if (!appoint) {
      return res.status(404).send({ message: "Appointment not found." });
    }
    appoint.status = req.body.status;
    await appoint.save();
    res.send({ message: "Appointment updated successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to update appointment." });
  }
});

export default appoinmentRoute;

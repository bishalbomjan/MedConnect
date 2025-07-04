import { Router } from "express";
import Appointment from "../models/appoinment.js";

const appoinmentRoute = Router();

appoinmentRoute.post("/appoinment/:pid/:did/", (req, res) => {
  Appointment.create({ bookedById: req.params.pid, doctorId: req.params.did });
});
appoinmentRoute.delete("/appoinment/:did/", (req, res) => {
  Appointment.findOneAndDelete({ did: req.params.did });
});
appoinmentRoute.patch("/appoinment/:pid/:did/", (req, res) => {
  Appointment.findOneAndUpdate({ did: req.params.did, pid: req.params.pid },{status:});
});

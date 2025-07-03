import { Router } from "express";
import Doctor from "../models/doctorKyc.js";

const routerDoctor = Router();

routerDoctor.post("/doctorkycs/:id", async (req, res) => {
  Doctor.create({ doctor: req.params.id, isKycSubmitted: true, ...req.body });
  return res.send({ message: "Doctor Kyc details submitted successfully" });
});

export default routerDoctor;

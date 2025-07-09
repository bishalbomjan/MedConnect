import { Router } from "express";
import Patient from "../models/patientKyc.js";

const routerPatient = Router();

routerPatient.post("/patientKyc/:id", async (req, res) => {
  const p = await Patient.findOne({ patient: req.params.id });
  if (p)
    return res
      .status(400)
      .send({ message: "You have already submitted a KYC form" });
  Patient.create({ patient: req.params.id, isKycSubmitted: true, ...req.body });
  return res.send({ message: "Patient Kyc details submitted successfully" });
});

routerPatient.get("/patientKyc", async (req, res) => {
  let kyc;
  if (req.query.status === "pending") {
    kyc = await Patient.find({ isKycApproved: false }).populate("patient");
  } else {
    kyc = await Patient.find().populate("PatientKyc");
  }
  return res.json(kyc);
});
routerPatient.get("/patientKyc/:id", async (req, res) => {
  const kyc = await Patient.findOne({ patient: req.params.id }).populate(
    "patient"
  );
  if (!kyc)
    return res.status(404).send({
      message: "Patient Kyc details not found, Please fill Kyc detail",
    });
  return res.send(kyc);
});

routerPatient.patch("/patientKyc/:id", async (req, res) => {
  const kyc = await Patient.findOne({ patient: req.params.id });
  if (!kyc) return res.status(404).json({ message: "KYC not found" });

  kyc.isKycApproved = true;
  await kyc.save();
  res.json({ message: "KYC approved successfully" });
});

export default routerPatient;

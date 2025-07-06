import { Router } from "express";
import Patient from "../models/patientKyc.js";

const routerPatient = Router();

routerPatient.post("/patientKyc/:id", async (req, res) => {
  Patient.create({ patient: req.params.id, isKycSubmitted: true, ...req.body });
  return res.send({ message: "Patient Kyc details submitted successfully" });
});

routerPatient.get("/patientKyc", async (req, res) => {
  let kyc;
  if (req.query.status === "pending") {
    kyc = await Patient.find({ isKycApproved: false }).populate("PatientKyc");
  } else {
    kyc = await Patient.find().populate("PatientKyc");
  }
  return res.json(kyc);
});
routerPatient.get("/patientKyc/:id", async (req, res) => {
  const kyc = await Patient.findOne({ patient: req.params.id });
  if (!kyc || kyc.length === 0)
    return res.status(404).send({
      isKycApproved: false,
      isKycSubmitted: false,
      message: "Patient Kyc details not found, Please fill Kyc detail",
    });
  return res.send({
    isKycApproved: kyc[0].isKycApproved || false,
    isKycSubmitted: ture,
    message: "Kyc Detail fetched successfully",
    kyc: kyc[0],
  });
});

routerPatient.patch("/patientKyc/:id", async (req, res) => {
  const kyc = await Patient.findById(req.params.id);
  console.log(kyc);
  kyc.isKycApproved = true;
  await kyc.save();
  res.json({ message: "KYC approved successfully" });
});

export default routerPatient;

import { Router } from "express";
import Doctor from "../models/doctorKyc.js";
import sendEmail from "../utils/sendEmail.js";

const routerDoctor = Router();

routerDoctor.post("/doctorkycs/:id", async (req, res) => {
  const doc = await Doctor.findOne({ doctor: req.params.id });
  if (doc)
    return res
      .status(400)
      .send({ message: "Kyc form has been already submitted" });
  Doctor.create({ doctor: req.params.id, isKycSubmitted: true, ...req.body });
  return res.send({ message: "Doctor Kyc details submitted successfully" });
});

routerDoctor.get("/doctorkycs", async (req, res) => {
  let kyc;
  if (req.query.status === "pending") {
    kyc = await Doctor.find({ isKycApproved: false }).populate("doctor");
  } else {
    kyc = await Doctor.find().populate("doctor");
  }
  return res.json(kyc);
});
routerDoctor.get("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findOne({ doctor: req.params.id });
  if (!kyc || kyc.length === 0)
    return res.status(404).send({
      isKycApproved: false,
      isKycSubmitted: false,
      message: "Doctor Kyc details not found, Please fill Kyc detail",
    });
  return res.send({
    isKycApproved: kyc[0].isKycApproved || false,
    isKycSubmitted: true,
    message: "Kyc Detail fetched successfully",
    kyc: kyc[0], // include the data if needed
  });
});

routerDoctor.patch("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findOne({ doctor: req.params.id }).populate(
    "doctor"
  );
  if (!kyc) {
    return res.status(404).send({ message: "KYC record not found" });
  }
  kyc.isKycApproved = true;
  await kyc.save();
  await sendEmail(kyc.doctor.email);
  return res.send({ message: "KYC approved successfully" });
});

export default routerDoctor;

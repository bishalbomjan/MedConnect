import { Router } from "express";
import Doctor from "../models/doctorKyc.js";

const routerDoctor = Router();

routerDoctor.post("/doctorkycs/:id", async (req, res) => {
  Doctor.create({ doctor: req.params.id, isKycSubmitted: true, ...req.body });
  return res.send({ message: "Doctor Kyc details submitted successfully" });
});

routerDoctor.get("/doctorkycs", async (req, res) => {
  let kyc;
  if (req.query.status === "pending") {
    kyc = await Doctor.find({ isKycApproved: false }).populate("DoctorKyc");
  } else {
    kyc = await Doctor.find().populate("DoctorKyc");
  }
  return res.json(kyc);
});
routerDoctor.get("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findOne({ doctor: req.params.id });
  if (!kyc)
    return res.status(404).send({
      isKycApproved: false,
      isKycSubmitted: false,
      message: "Doctor Kyc details not found",
    });
  return res.send({
    isKycApproved: kyc.isKycApproved,
    isKycSubmitted: kyc.isKycSubmitted,
    message: "KYC details found successfully",
  });
});

routerDoctor.patch("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findById(req.params.id);
  console.log(kyc);
  kyc.isKycApproved = true;
  await kyc.save();
  res.json({ message: "KYC approved successfully" });
});

export default routerDoctor;

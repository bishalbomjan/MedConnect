import { Router } from "express";
import Doctor from "../models/doctorKyc.js";
import sendEmail from "../utils/sendEmail.js";
import multer from "multer";
const routerDoctor = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
routerDoctor.post(
  "/doctorkycs/:id",
  upload.single("uplodedFiles"),
  async (req, res) => {
    const doc = await Doctor.findOne({ _id: req.params.id });
    if (doc)
      return res
        .status(400)
        .send({ message: "Kyc form has been already submitted" });
    Doctor.create({
      doctor: req.params.id,
      _id: req.params.id,
      isKycSubmitted: true,
      ...req.body,
    });
    return res.send({ message: "Doctor Kyc details submitted successfully" });
  }
);

routerDoctor.get("/doctorkycs", async (req, res) => {
  try {
    const { specialization, status } = req.query;

    const query = {};

    // Filter by KYC approval status
    if (status === "pending") {
      query.isKycApproved = false;
    }

    // Filter by specialization(s)
    if (specialization && specialization !== "") {
      // Split by comma to support multiple values
      const specializationsArray = specialization
        .split(",")
        .map((s) => s.trim());

      // Use $in to match any specialization
      query.specializations = { $in: specializationsArray };
    }
    let kyc;
    if (query) {
      kyc = await Doctor.find(query).populate("doctor");
    } else {
      kyc = await Doctor.find().populate("doctor");
    }

    return res.json(kyc);
  } catch (error) {
    console.error("Error fetching KYC records:", error);
    res.status(500).json({ error: "Server error" });
  }
});

routerDoctor.get("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findOne({ doctor: req.params.id }).populate(
    "doctor"
  );
  if (!kyc)
    return res.status(404).send({
      message: "Doctor details not found, Please fill Kyc detail",
    });

  return res.send({
    message: "Doctor detail fetched successfully",
    kyc,
  });
});

routerDoctor.patch("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findById(req.params.id).populate("doctor");
  if (!kyc) {
    return res.status(404).send({ message: "KYC record not found" });
  }
  kyc.isKycApproved = true;
  await kyc.save();
  await sendEmail(kyc.doctor.email);
  return res.send({ message: "KYC approved successfully" });
});

export default routerDoctor;

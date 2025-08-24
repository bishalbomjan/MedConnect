import { Router } from "express";
import Doctor from "../models/doctorKyc.js";
import sendEmail from "../utils/sendEmail.js";
import multer from "multer";

const routerDoctor = Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Submit doctor KYC
routerDoctor.post(
  "/doctorkycs/:id",
  upload.single("uploadFiles"),
  // match with frontend field name
  async (req, res) => {
    const doc = await Doctor.findOne({ _id: req.params.id });
    if (doc)
      return res
        .status(400)
        .send({ message: "Kyc form has been already submitted" });
    await Doctor.create({
      _id: req.params.id,
      doctor: req.params.id,
      fullname: req.body.fullname,
      degree: req.body.degree,
      NMCID: req.body.NMCID,
      specializations: req.body.specializations,
      experience: req.body.experience,
      experienceYear: req.body.experienceYear,
      price: req.body.price,
      isKycSubmitted: true,
      uploadFiles: req.file?.filename,
    });
    res
      .status(200)
      .json({ message: "Doctor Kyc details submitted successfully." });
  }
);

// Get all KYC records (with filters)
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

// Get single doctor KYC
routerDoctor.get("/doctorkycs/:id", async (req, res) => {
  const kyc = await Doctor.findOne({ doctor: req.params.id }).populate(
    "doctor"
  );

  if (!kyc) {
    return res.status(404).send({
      message: "Doctor details not found, Please fill Kyc detail",
    });
  }

  return res.send({
    message: "Doctor detail fetched successfully",
    kyc,
  });
});

// Approve doctor KYC
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

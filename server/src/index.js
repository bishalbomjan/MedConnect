import express from "express";
import dbConnect from "./db/dbConnect.js";
import routerDoctor from "./routes/doctor.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import routerPatient from "./routes/patient.js";
import timeSlotRoute from "./routes/timeSlot.js";
import prescriptionRoute from "./routes/prescription.js";
const app = express();
const port = 8080;
dbConnect();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(userRoute);
app.use(routerDoctor);
app.use(routerPatient);
app.use(timeSlotRoute);
app.use(prescriptionRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

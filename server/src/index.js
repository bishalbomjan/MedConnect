import express from "express";
import dbConnect from "./db/dbConnect.js";
import routerDoctor from "./routes/doctor.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import routerPatient from "./routes/patient.js";
const app = express();
const port = 8080;
app.use(express.json());
dbConnect();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(userRoute);
app.use(routerDoctor);
app.use(routerPatient);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

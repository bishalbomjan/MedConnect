import express from "express";
import dbConnect from "./db/dbConnect.js";
import User from "./models/user.js";
import userRoute from "./routes/user.js";
import cors from "cors";
const app = express();
const port = 8080;
dbConnect();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(express.json());
app.use(userRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

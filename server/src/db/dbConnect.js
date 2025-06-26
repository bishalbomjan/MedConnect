// getting-started.js
import mongoose from "mongoose";

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect("mongodb://localhost/MedConnect");
}
export default dbConnect;

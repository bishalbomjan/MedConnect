// getting-started.js
import mongoose from "mongoose";

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect("mongodb://localhost:27017/MedConnect");
}
export default dbConnect;

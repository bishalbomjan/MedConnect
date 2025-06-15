// getting-started.js
import mongoose from "mongoose";

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MedConnect");
}
export default dbConnect;

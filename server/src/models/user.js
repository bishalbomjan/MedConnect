import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);
export default User;

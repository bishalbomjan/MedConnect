import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  role: String,
  phoneNumber: String,
  location: String,
  password: String,
  isApproved: { type: Boolean, default: false },
});
const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  role: String,
  phone: String,
  location: String,
  password: String,
});
const User = mongoose.model("User", userSchema);
export default User;

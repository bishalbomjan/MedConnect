import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const userRoute = Router();

userRoute.post("/register", async (req, res) => {
  // step 1: Check if the email already exist
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.send("Email already taken");
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    User.create(req.body);
    return res.send("User Registered");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
userRoute.post("/login", async (req, res) => {
  // Step 1 email should exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ message: "Email not found" });
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) return res.send({ message: "Invalid password" });

  const token = await jwt.sign({ email: req.body.email }, "randomtext");
  return res.send({
    message: "Logged in successfully",
    user: user,
    isLoggedIn: true,
    token,
  });
});

userRoute.get("/user", async (req, res) => {
  const userData = await User.find();
  res.send(userData);
});

export default userRoute;

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
    return res.status(401).send("Email already taken");
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
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.send({ message: "Email not found" });
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) return res.send({ message: "Invalid password" });

  const token = await jwt.sign(
    { email: email },
    "b278edc9d417c66f8c7ce952b5a896dc82bbe29bcd1bdcd27ff9eb98aee50a50c5b6bd112af4cea76f08d2a6fe2ae78ec77e289c1bdfe06b51c28000fe2cf0e7"
  );
  return res.send({
    message: "Logged in successfully",
    user: user,
    isLoggedIn: true,
    token,
  });
});

userRoute.get("/user", async (req, res) => {
  let data;
  console.log(req.query.role);
  if (req.query.role) {
    data = await User.find({ role: req.query.role, isApproved: false });
  } else {
    data = await User.find();
  }
  res.send(data);
});
userRoute.patch("/user/:id", async (req, res) => {
  let user;
  user = await User.findById(req.params.id);
  user.isApproved = true;
  await user.save();
  return res.send({ message: "User data update successfully", user });
});

export default userRoute;

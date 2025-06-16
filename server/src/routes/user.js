import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/user.js";

const saltRounds = 10;
const router = Router();

router.post("/register", async (req, res) => {
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

router.get("/user", async (req, res) => {
  const userData = await User.find();
  res.send(userData);
});

export default router;

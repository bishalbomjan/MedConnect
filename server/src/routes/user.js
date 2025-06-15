import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
const router = Router();
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.send("Email already taken");
  else {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    User.create(req.body);
  }
  return res.send("User Registered");
});
router.get("/user", async (req, res) => {
  const userData = await User.find();
  res.send(userData);
});

export default router;

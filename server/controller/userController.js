import { response } from "express";
import User from "../models/userSchema.js";

export const userSignup = async (req, res) => {
  try {
    const exist = await User.findOne({ username: req.body.username });
    if (exist) {
      return res.status(401).json({ message: "Username already exist!!!" });
    }
    // console.log(req.body);
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const emailid = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({ email: emailid, password: password });
    if (user) {
      // return res.status(200).json(`${username} Login Successfully!!!`);
      return res.status(200).json({ data: user });
    } else {
      return res.status(401).json("Invalid Login");
    }
  } catch (error) {
    res.status(500).json("Error", error.message);
  }
};

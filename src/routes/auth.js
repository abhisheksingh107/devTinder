const express = require("express");
const authRouter = express.Router();
const {
  validateSignUpData,
  validateLoginUpData,
} = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../model/user");

authRouter.post("/signup", async (req, res) => {
  try {
    await validateSignUpData(req); // Validate the data

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // encrypt the password
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send(user);
    console.log("user saved");
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLoginUpData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordvalid = await user.validatePassword(password);
    if (isPasswordvalid) {
      const token = await user.getJWT(); //creating JWT token

      // create a cookie and wrap the token inside cookie
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // Expire in 1-day
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.send(user);
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = authRouter;

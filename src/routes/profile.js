const express = require("express");
const profileRouter = express.Router();
const { validateEditData, validatePasswordData } = require("../utils/validate");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
profileRouter.use(express.json());

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      return res.status(400).json({ error: "Invalid update fields" });
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile has been updated successfully.`,
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/forget-password", async (req, res) => {
  try {
    validatePasswordData(req);
    const { emailId, newPassword } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(400).json({ message: "User not found." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    console.log(user.password);
    await user.save();
    res.send("Password has been updated");
  } catch (error) {
    throw new Error("Error : " + error.message);
  }
});

module.exports = profileRouter;

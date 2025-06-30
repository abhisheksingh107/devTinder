const express = require("express");
const app = express();
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./model/user");
const { validateSignUpData, validateLoginUpData } = require("./utils/validate");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validate the data
    await validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLoginUpData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    console.log(user);
    console.log(user.password);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (isPasswordvalid) {
      res.send("Login Successfully");
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});
//  Get /user API to get the user from the database

app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId;
  console.log(userEmail);
  try {
    const user = await User.find({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("user is not found");
    }
    res.send(user);
  } catch (error) {
    res.status(401).send("Something went wrong");
  }
});

// Feed API - /feed to get the all the users from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send("can't find the users");
    }
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

//  Delete API/ to delete the user from the database

app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User is not found");
    }
    res.send("User is deleted successfully");
  } catch (error) {
    res.status(500).send("User has been Deleted Successfully");
  }
});

// Patch API - Update the data of the user
app.patch("/user", async (req, res) => {
  const userid = req.body._id;
  const data = req.body;
  try {
    const allowedObj = [
      "_id",
      "firstName",
      "lastName",
      "age",
      "gender",
      "password",
      "skills",
      "photoUrl",
      "about",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedObj.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates are not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }

    const user = await User.findByIdAndUpdate(
      userid,
      { $set: data },
      { new: true, runValidators: true }
    );
    console.log(user);
    if (!user) {
      res.status(404).send("user is not found");
    }
    res.send("user is updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

connectDB()
  .then(() => {
    console.log("connection is established...");
    app.listen(7777, () => {
      console.log("Server is listening on PORT 7777");
    });
  })
  .catch((err) => {
    console.error("connection can't be established...");
  });

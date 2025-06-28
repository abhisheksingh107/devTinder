const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./model/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sachin",
    lastName: "tendulkar",
    age: 25,
    gender: "male",
    emailId: "sachin@tendulakr.com",
    password: "sachin",
  });
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(500).send("User is not added");
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

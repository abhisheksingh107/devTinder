const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/ConnectionRequest");
const userRoutes = express.Router();
const User = require("../model/user");

userRoutes.get("/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age photoUrl about skills");
    res.status(200).json({
      message: "details fetched Sucessfully",
      connectionRequest,
    });
  } catch (error) {
    res.send("Error : " + error.message);
  }
});

userRoutes.get("/request/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", "firstName lastName age photoUrl about")
      .populate("toUserId", "firstName lastName age about photoUrl");

    // Only return the details of the other user in each connection
    const connections = connectionRequest.map((connection) => {
      if (
        connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return connection.toUserId;
      } else {
        return connection.fromUserId;
      }
    });

    res.status(200).json({
      message: "fecthing All connection",
      connections,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error : ",
      error: error.message,
    });
  }
});

userRoutes.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUserFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(hideUserFromFeed) } },
      ],
    }).select("firstName lastName age about skills photoUrl").skip(skip).limit(limit);

    res.send(users);
  } catch (error) {
    res.status(500).json({
      message: "Error : ",
      error: error.message,
    });
  }
});

module.exports = userRoutes;

const express = require("express");
const requestRouter = express.Router();
const User = require("../model/user");
const ConnectionRequest = require("../model/ConnectionRequest");
const { userAuth } = require("../middleware/auth");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type",
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      if (fromUserId.equals(toUserId)) {
        return res.status(400).json({
          message: "You can't send a request to yourself",
        });
      }

      //  checking if there is any existing ConnectionRequest

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: toUserId, toUserId: fromUserId },
          { fromUserId, toUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exists",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.status(200).json({
        message: "Connection request has been sent",
        data,
      });
    } catch (error) {
      res.status(500).send("Error : " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowStatus = ["accepted", "rejected"];
    if (!allowStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type",
      });
    }

    const connectionRequest = await ConnectionRequest.findById(requestId);
    if (!connectionRequest) {
      return res.status(400).json({
        message: "request not found in DB",
      });
    }

    if (connectionRequest.status != "interested") {
      return res.status(400).json({
        message: "Only interested request can be responded to",
      });
    }

    if (!connectionRequest.toUserId.equals(loggedInUser._id)) {
      return res.status(403).json({
        message: "You are not authorized to respond to this request",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.status(200).json({
      message: "Connection request has been successfully updated",
      data,
    });
  }
);


module.exports = requestRouter;

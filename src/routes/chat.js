const express = require("express");
const Chat = require("../model/Chat");
const { userAuth } = require("../middleware/auth");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;
    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ message: "The UserId and targetID is missing" });
    }

    const chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate("messages.senderId", "firstName photoUrl").populate("participants", "firstName photoUrl")

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = chatRouter;

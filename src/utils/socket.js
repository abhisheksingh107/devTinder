const { Server } = require("socket.io");

const crypto = require("crypto");
const Chat = require("../model/Chat");
const ConnectionRequest = require("../model/ConnectionRequest");
const getSecretRoomId = (userId, targetUserId) => {
  const roomId = [userId, targetUserId].sort().join("_");
  return crypto.createHash("sha256").update(roomId).digest("hex");
};
const initializeSocket = (server) => {
  // Initializing your Socket.IO server and configuring CORS
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ A client connected");
    // listens for a joinChat event on a Socket.IO server and joins the user to a private chat room.
    socket.on("joinChat", async ({ firstName, userId, targetUserId }) => {
       if (!userId || !targetUserId) {
          console.log("❌ Invalid message payload");
          return;
        }
        if (
          !await ConnectionRequest.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                fromUserId: targetUserId,
                toUserId: userId,
                status: "accepted",
              },
            ],
          })
        ) {
          console.log("❌ They are not connected to each other");
          return;
        }
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
      console.log(firstName + " is joined in room " + roomId);
    });

    socket.on(
      "sendMessage",
      async ({ text, firstName, userId, targetUserId, photoUrl }) => {
        if (!text || !userId || !targetUserId || !firstName || !photoUrl) {
          console.log("❌ Invalid message payload");
          return;
        }
        if (
          !await ConnectionRequest.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                fromUserId: targetUserId,
                toUserId: userId,
                status: "accepted",
              },
            ],
          })
        ) {
          console.log("❌ They are not connected to each other");
          return;
        }
        // Save message to the dataBase
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " sent an message " + text);
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          const lastmessages = chat.messages[chat.messages.length - 1];

          const messageData = {
            firstName,
            senderId: lastmessages.senderId,
            text: lastmessages.text,
            timestamp: lastmessages.createdAt,
            photoUrl,
          };
          io.to(roomId).emit("receiveMessage", messageData);
        } catch (error) {
          console.error(error);
        }
      }
    );
    socket.on("disconnect", () => {
      console.log(`❌ A user disconnected: ${socket.id}`);
    });
  });
};

module.exports = initializeSocket;

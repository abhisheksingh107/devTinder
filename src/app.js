const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const http = require("http");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");



require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", chatRouter);
app.use("/", userRoutes);


const server = http.createServer(app);

initializeSocket(server);


connectDB()
  .then(() => {
    console.log("connection is established...");
    server.listen(process.env.PORT, () => {
      console.log("Server is listening on PORT 7777");
    });
  })
  .catch((err) => {
    console.error("connection can't be established..." + err.message);
  });

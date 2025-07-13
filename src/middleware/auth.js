const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }

    // verify the token
    const decodeObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeObj;

    const user = await User.findById({ _id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error : " + error.message);
  }
};

module.exports = {
  userAuth,
};

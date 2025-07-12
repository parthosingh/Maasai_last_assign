const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Missing or invalid token format" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.userId; // Save it to req.userId instead of req.body

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token", error });
  }
};

module.exports = { auth };

// src/middlewares/verifyToken.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "DarshanVasaniVanshikaThesiya";

const verifyToken = (req, res, next) => {
  try {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Check if token is null or empty
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token missing in Authorization header" });
    }

    // Verify the token
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized access: invalid token",
          error: err.message,
        });
      }

      // Attach decoded token data to req.decoded (for consistency with other middlewares)
      req.decoded = decoded; // Change from req.user to req.decoded
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyToken;

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for Bearer token format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized access: No token provided"));
  }

  // Extract the token using the specified method
  const prefix = "Bearer ";
  const start = authHeader.indexOf(prefix);
  const token =
    start !== -1 ? authHeader.substring(start + prefix.length) : null;

  // Check if the token is present
  if (!token) {
    return next(new ApiError(401, "Unauthorized access: Token missing"));
  }

  // Check if the token secret is defined
  if (!process.env.ACCESS_TOKEN_SECRET) {
    return next(new ApiError(500, "Server error: Missing token secret"));
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return next(
        new ApiError(401, "Unauthorized access: Invalid or expired token")
      );
    }

    // Optionally validate the decoded token if needed
    req.decoded = decoded; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

export default verifyToken;

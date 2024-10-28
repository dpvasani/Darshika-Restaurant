// src/middlewares/verifyAdmin.js
import jwt from "jsonwebtoken"; // Although not used here, it's often needed for additional functionality
import User from "../models/User.js";

const verifyAdmin = async (req, res, next) => {
  try {
    // Ensure req.decoded is available
    if (!req.decoded || !req.decoded.email) {
      return res
        .status(401)
        .send({ message: "Unauthorized access: email not found in token" });
    }

    const email = req.decoded.email;
    const query = { email: email };

    // Find the user by email
    const user = await User.findOne(query);

    // Check if user exists and if they are an admin
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden access" });
    }

    // If everything is fine, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default verifyAdmin; // Use 'export default' instead of 'module.exports'

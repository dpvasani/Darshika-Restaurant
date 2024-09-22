import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await User.findOne(query);
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access" });
  }

  next();
};

export default verifyAdmin; // Use 'export default' instead of 'module.exports'

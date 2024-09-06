import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  // const { authorization } = req.headers;
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Authorization token not found" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(id).select("_id");
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default auth;

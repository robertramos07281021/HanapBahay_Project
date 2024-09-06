import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};

export default class UserAPI {
  static async registerUser(req, res) {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email is already exists." });
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({ email, password: hashed });
      const token = createToken(user._id);
      return res.status(200).json({ email, token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password." });
    }

    if (user.login === true) {
      return res.status(403).json({ error: "This account is already login" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect email or password." });
    }

    try {
      const token = createToken(user._id);
      await user.updateOne({ login: true });
      return res.status(200).json({ email, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateLogout(req, res) {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email not exists!" });
    }

    try {
      await user.updateOne({ login: false });
      return res.state(200).json({ message: "Successfully logged out." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

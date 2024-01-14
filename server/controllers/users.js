import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const SECRET = "test";

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "user already exists" });
    if (password != confirmPassword)
      return res.status(404).json({ message: "passwords don't match" });

    const hashed = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashed, name });
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "something went wrong" });
  }
};

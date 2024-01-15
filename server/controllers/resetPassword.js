import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendResetPasswordEmail from "../utils/email.js";

const SECRET = "test";

export const passwordResetRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      res.status(400).json({ message: "no account exits for this email" });
    const resetToken = jwt.sign({ email, id: user._id }, SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:5000/password-reset/submit/${user._id}/${resetToken}`;
    await sendResetPasswordEmail(email,resetLink);
    console.log(resetLink);
    res.json({ message: "password reset link sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const passwordResetSubmit = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;
  try {
    if (password !== confirmPassword)
      res.status(404).json({ message: "passwords don't match" });
    const decoded = jwt.verify(token, "test");
    console.log(decoded);
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashed }
    );
    console.log(user);
    res.status(200).json({message:"password reset successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something unexpected happened" });
  }
};

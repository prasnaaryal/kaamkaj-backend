import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as EmailService from "../email/emailServices.mjs";
import User from "../../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(
  email,
  password,
  confirmPassword,
  fullName,
  role
) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with the same Email already exists");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User does not exist");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password does not match");
    }
    const accessToken = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return accessToken;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changePassword(
  email,
  oldPassword,
  newPassword,
  confirmPassword
) {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User does not exist");
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new Error("Old password is incorrect");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new Error("New password cannot be the same as the old password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const resetPasswordRequest = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const resetToken = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET, {
      expiresIn: "1h",
    });
    user.resetToken = resetToken;
    await user.save();
    await EmailService.sendResetPasswordEmail(user.email, resetToken);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (
  resetToken,
  newPassword,
  confirmPassword
) => {
  try {
    if (newPassword !== confirmPassword) {
      throw new Error("Password and confirm password do not match");
    }
    const decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET);
    const user = await User.findOne({ email: decoded.email, resetToken });
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

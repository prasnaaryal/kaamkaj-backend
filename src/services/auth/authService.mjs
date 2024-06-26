import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as EmailService from "../email/emailServices.mjs";
import User from "../../models/User.js";

export async function registerUser(
  email,
  password,
  confirmPassword,
  fullName,
  image
) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      throw new Error("User with the same Email or Username already exists");
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      fullName,
    
      email,
      password: hashedPassword,
      image,
    });
    // Save the user to the database
    await newUser.save();
    // send verification email
    // const token = EmailService.generateToken(email);
    // await EmailService.sendVerificationEmail(email, token);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loginUser(email, password) {
  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("User doesnot exist");
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password doesnot match");
    }
    // jsonWebToken
    const LoggedInUser = { username: user.username, userId: user.id };
    const accessToken = jwt.sign(LoggedInUser, process.env.ACCESS_TOKEN_SECRET);
    // Login successful
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
}

export const verifyEmail = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decodedToken;

    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true } // Add the new option to get the updated user
    );

    if (!user) {
      throw new Error({ message: "User doesnot exist" });
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// for reset password request
export const resetPasswordRequest = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User doesnot exist");
    }
    // Generate a token
    const resetToken = EmailService.generateToken(email);
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);
    user.resetToken = {
      token: resetToken,
      expiration: resetTokenExpiration,
    };
    await user.save();
    // Send the email
    await EmailService.sendResetPasswordEmail(user.email, resetToken);
  } catch (error) {
    throw new Error(error);
  }
};

// Verify reset password
export const verifyResetPassword = async (resetToken) => {
  try {
    const user = await User.findOne({
      "resetToken.token": resetToken,
      "resetToken.expiration": { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
  } catch (error) {
    // Handle the error and provide a more informative error message
    throw new Error(`Reset password verification failed: ${error.message}`);
  }
};

// Reset password
export const resetPassword = async (resetToken, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password doesnot match");
    }
    const user = await User.findOne({
      "resetToken.token": resetToken,
      "resetToken.expiration": { $gt: Date.now() },
    }).select("password");
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      throw new Error("New password cannot be the same as the old password");
    }
    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

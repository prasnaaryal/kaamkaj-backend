import * as AuthService from "../../services/auth/authService.mjs";

export const register = async (req, res) => {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    role = "applicant",
  } = req.body;
  try {
    const user = await AuthService.registerUser(
      email.trim(),
      password.trim(),
      confirmPassword.trim(),
      fullName.trim(),
      role
    );
    return res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const accessToken = await AuthService.loginUser(
      email.trim(),
      password.trim()
    );
    return res
      .status(200)
      .json({ message: "User logged in successfully", accessToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await AuthService.changePassword(
      email.trim(),
      oldPassword.trim(),
      newPassword.trim(),
      confirmPassword.trim()
    );
    return res
      .status(200)
      .json({ message: "Password changed successfully", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    await AuthService.resetPasswordRequest(email.trim());
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;
  try {
    await AuthService.resetPassword(
      token.trim(),
      newPassword.trim(),
      confirmPassword.trim()
    );
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

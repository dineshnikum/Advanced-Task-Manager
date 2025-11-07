import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

// google login
export const googleLogin = async (req, res) => {};

// register user
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format!" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jsonwebtoken.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred during registration!",
      error: error.message,
    });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    const token = jsonwebtoken.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User logged in successfully!",
      data: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred during login!",
      error: error.message,
    });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({
      success: false,
      message: "Server error occured during logout!",
      error: err.message,
    });
  }
};

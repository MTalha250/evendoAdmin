import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

// Register
export const register = async (req, res) => {

  const { name, email, password } = await req.body;
  const { hash } = bcrypt;

  try {
    const user = await User.findOne({ email });
    // checking if user already exists
    if (user) {
      return res.status(500).send("User already exists");
    }
    // hash password
    const hashedPassword = await hash(password, 10);
    // creating new user
    const newUser = new User({
      name,
      email,
      isAdmin: false,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({ result: newUser });

  } catch (error) {
    console.log(error)
    return res.status(500).send("An error occurred");
  }
}


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User doesn't exist");
    }
    // Validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }
    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    user.approved = true;

    await user.save();

    res.redirect(process.env.FRONTEND_URI);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
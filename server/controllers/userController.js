const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { email, first_name, last_name, age, blood_group, gender, password, phoneNumber } = req.body;

    // Validate all fields
    if (!email || !first_name || !last_name || !age || !blood_group || !gender || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        email,
        first_name,
        last_name,
        age,
        blood_group,
        gender,
        phoneNumber,
        password: hashedPassword,
    });

    // Generate JWT token for the registered user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Respond with user data and token
    res.status(201).json({ message: "User registered successfully", user, token });
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password fields
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for successful login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Respond with token and user information
    res.status(200).json({ message: "Login successful", token, user: { email: user.email, first_name: user.first_name } });
});

// Get All Users (Account list)
const getAccount = asyncHandler(async (req, res) => {
    const accounts = await User.find({});
    res.status(200).json(accounts);
});

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const { email } = req.user; // Assuming `validateJwtToken` middleware sets `req.user`
    const { first_name, last_name, age, blood_group, phoneNumber, gender } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !age || !blood_group || !phoneNumber || !gender) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    // Find and update the user profile
    const updatedAccount = await User.findOneAndUpdate(
        { email },
        { first_name, last_name, age, blood_group, phoneNumber, gender },
        { new: true }
    );

    if (updatedAccount) {
        res.send({message:"user updated" , updatedAccount});
        // throw new Error("User not found");
    }

    res.status(200).json({ message: "Profile updated successfully", updatedAccount });
});

module.exports = { registerUser, loginUser, getAccount, updateUserProfile };

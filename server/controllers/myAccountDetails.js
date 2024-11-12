const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const account = require("../model/myAccountModel");
require("dotenv").config();

const AccountDetails = asyncHandler(async (req, res) => {
    const { id, name, phoneNumber, age, gender, address } = req.body;
    if (!id || !name || !phoneNumber || !age || !gender || !address) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const AccountExists = await account.findOne({ id });
    if (AccountExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const Account = await account.create({
        id,
        name,
        phoneNumber,
        age,
        gender,
        address,
    });

    // Generate token after account creation
    const token = jwt.sign({ id: Account._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "Account created successfully", token, Account });
});

// GET route for retrieving all account details
const getAccount = asyncHandler(async (req, res) => {
    const accounts = await account.find({});
    res.status(200).json(accounts);
});

module.exports = {
    AccountDetails,
    getAccount,
};

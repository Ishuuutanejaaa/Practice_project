const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User=require("../model/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async(req,res)=>{
    const {email , first_name, last_name, age, blood_group, gender, password, phoneNumber}=req.body;
    if(!email || !first_name || !last_name || !age || !blood_group || !gender || !password || !phoneNumber){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: "user already exists"});
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create the user
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

    res.status(201).json({message:"User registered succesfully",user});
});
module.exports={registerUser}
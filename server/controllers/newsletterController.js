const asyncHandler = require("express-async-handler");
const Newsletter = require("../model/newsletterModel");

const getNewsletter=asyncHandler(async(req,res)=>{
    try{
        const data = await Newsletter.find({});
        if(!data){
            return res.status(404).json({message : "No newsletter found"});
        }
        return res.status(200).json(data);
        
    }catch(err){
        return res.status(404).json({err:err.message})
    }
});

const createNewsletter=asyncHandler(async(req,res)=>{
    const {title,author,date,imageUrl,description}=req.body;
    if(!title || !author || !date || !imageUrl || !description){
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const newsletterExists  = await Newsletter.findOne({title});
    if(newsletterExists){
        return res.status(400).json({message: "Newsletter exists"});
    }
    const newUser  = await Newsletter.create({
        title,
        author,
        date,
        imageUrl,
        description
    });
    res.status(201).json({message:"Newsletter  found",newUser});
});

module.exports={getNewsletter , createNewsletter}
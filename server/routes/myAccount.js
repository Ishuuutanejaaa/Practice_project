const express=require("express");
const router=express.Router();
const{
    AccountDetails,getAccount
}=require("../controllers/myAccountDetails");

//route for registration
router.post("/accdetails",AccountDetails);

// GET route for retrieving doctor details
router.get("/accdetails", getAccount); // New GET route
//route for user login 
//router.post("/login",loginUser);
module.exports=router;
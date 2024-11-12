const express=require("express");
const router=express.Router();
const{
    AccountDetails,getAccount
}=require("../controllers/myAccountDetails");
const {validateJwtToken} = require("../middlewares/jwtMiddleware");

router.post("/accdetails",AccountDetails);

router.get("/accdetails",validateJwtToken, getAccount); // New GET route

module.exports=router;
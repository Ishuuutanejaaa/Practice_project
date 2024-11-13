// const express=require("express");
// const router=express.Router();
// // import {jwtAuthMiddleware} from "../middlewares/jwtMiddleware";
// // const { jwtAuthMiddleware, generateToken } = require("../middlewares/jwtMiddleware"); // Use require instead of import

// const{
//     registerUser,
//     loginUser
// }=require("../controllers/userController");

// //route for registration
// router.post("/register",registerUser);
// //route for user login 
// //router.post("/login",loginUser);
// router.post("/login" ,loginUser);
// module.exports=router;

// const express = require("express");
// const router = express.Router();
// const { jwtAuthMiddleware } = require("../middlewares/jwtMiddleware"); // Use require instead of import
// const { registerUser, loginUser } = require("../controllers/userController");

// // Route for registration
// router.post("/register", registerUser);

// // Route for user login
// router.post("/login", jwtAuthMiddleware, loginUser);
// // router.post("/login", loginUser); // Remove jwtAuthMiddleware from login

// module.exports = router;


const express=require("express");
const router=express.Router();
const{
    registerUser,loginUser , getAccount,
    updateUserProfile
}=require("../controllers/userController");
const {validateJwtToken} = require("../middlewares/jwtMiddleware");

router.post("/register",registerUser);

router.post("/login",validateJwtToken, loginUser); // New GET route

router.get("/get",validateJwtToken,getAccount);

router.put("/update",validateJwtToken,updateUserProfile);

module.exports=router;

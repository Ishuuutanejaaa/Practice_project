const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            require:[true,"please add your email"],
        },
        first_name:{
            type:String,
            require:[true,"please add your first_name"],
        },
        last_name:{
            type:String,
            require:[true,"please add your last_name"],
        },
        age:{
            type:Number,
            require:[true,"please add your age"],
        },
        blood_group:{
            type:String,
            require:[true,"please add your blood_group"],
        },
        gender:{
            type:String,
            require:[true,"please add your gender"],
        },
        phoneNumber:{
            type:String,
            require:[true,"please add your phonenumber"],
        },
        password:{
            type:String,
            require:[true,"please add your password"],
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("User",userSchema);

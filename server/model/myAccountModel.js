const mongoose = require("mongoose");
const AccountSchema = mongoose.Schema(
    {
        id:{
            type:String,
            require:[true,"please add your id"],
        },
        name:{
            type:String,
            require:[true,"please add your name"],
        },
        phoneNumber:{
            type:String,
            require:[true,"please add your phonenumber"],
        },
        age:{
            type:String,
            require:[true,"please add your age"],
        },
        gender:{
            type:String,
            require:[true,"please add your gender"],
        },
        address:{
            type:String,
            require:[true,"please add your address"],
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("account",AccountSchema);
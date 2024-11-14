const mongoose = require("mongoose");
const newsletterSchema = mongoose.Schema(
    {
        title:{
            type:String,
            require:[true,"please add your title"],
        },
        author:{
            type:String,
            require:[true,"please add your author"],
        },
        date:{
            type:String,
            require:[true,"please add your date"],
        },
        imageUrl:{
            type:String,
            require:[true,"please add your imageUrl"],
        },
        description:{
            type:String,
            require:[true,"please add your description"],
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Newsletter",newsletterSchema);

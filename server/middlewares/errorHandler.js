const {constants}=require("../constants");  //we hav put in object instead of simple var coz of multiple key-value pairs(we have to pick one of them), so it is in form of obj
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;  //500 server error 
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"validation falied",
                message:err.message,
                stackTrace:err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title:"Not found",
                message:err.message,
                stackTrace:err.stack,
            });

        case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized",
                message:err.message,
                stackTrace:err.stack,
            });

        case constants.SERVER_ERROR:
            res.json({
                title:"server error ",
                message:err.message,
                stackTrace:err.stack,
            });

        case constants.FORBIDDEN:
            res.json({
                title:"forbidden ",
                message:err.message,
                stackTrace:err.stack,
            });

        default:
            console.log("no error! all good!!");
            break;
    }
};

module.exports=errorHandler;
const express = require('express');
const connectDb=require("./config/dbConnection");
const errorHandler=require('./middlewares/errorHandler');
const cors=require("cors"); 
const mongoose = require('mongoose');
const dotenv=require("dotenv");
var hbs=require('hbs');
const path = require("path");
const multer  = require('multer');
const File = require('./model/file');


//env file config
dotenv. config();
connectDb();

const app=express();
const port =process.env.PORT || 3000; 


const conn = mongoose.connection;


app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials',function(err){});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes below 
app.get('/',(req,res)=>{
    res.send("working");
});
app.get("/home",(req,res)=>{
    res.render("home",{
        username:"ishi",
        posts:"flana dhimkana"
    })
});

app.get("/alluser",(req,res)=>{
    const user=[
        {username:"ishi",age:19},
        {username:"harleen",age:50},
        {username:"leen",age:20}
    ];
    res.render("alluser",{
        user:user
    });
});
//error handling middleware 
app.use(errorHandler)


app.use("/api/register",require("./routes/userRoutes"));

app.use("/api/details",require("./routes/doctorsDetails"));

app.use("/api/newsletter",require("./routes/newsletterRoutes"));
// app.use("/api/accdetails",require("./routes/myAccount"));

// // app.post('/profile', upload.single('avatar'), function (req, res, next) {
// //     // req.file is the `avatar` file
// //     // req.body will hold the text fields, if there were any
// //     console.log(req.body);
// //     console.log(req.file);
// //     return res.redirect("/home");  //for redirecting it back to the home 
// //   });

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   }) ;

// Configure Multer storage with unique filenames
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });

// Home route to render the page
app.get("/home", async (req, res) => {
    // Fetch all uploaded files from MongoDB
    const files = await File.find();
    res.render("home", {
        username: "Ishika",
        users: [{ name: "John Doe", age: 30 }, { name: "Jane Smith", age: 25 }],
        files: files // Pass files to the template
    });
});

// Route to handle file upload and save metadata in MongoDB
app.post('/profile', upload.single('avatar'), async (req, res) => {
    try {
        // Create a new file record in MongoDB
        const fileData = new File({
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
        });

        await fileData.save(); // Save metadata to MongoDB
        console.log("File metadata saved:", fileData);

        return res.redirect("/home");
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file.");
    }
});


//app config start 
app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
})
// /*
// dr  appointment ---- 
// id:, name:string
// dr specialization:String
// //phone no hospital no , address string
// //available slot:20  */

// //framework configuration 


// const express = require('express')
// const connectDb=require("./config/dbConnection")
// const errorHandler=require('./middlewares/errorHandler')
// const cors=require("cors"); 
// const mongoose = require('mongoose');
// const multer  = require('multer');
// // const upload = multer({ dest: 'uploads/' });
// const Grid = require('gridfs-stream');
// const { Readable } = require('stream');

// //env file config
// const dotenv=require("dotenv");
// dotenv. config();

// const app=express();
// const port =process.env.PORT || 5000; 

// connectDb();
// const conn = mongoose.connection;


// app.set('view engine','hbs');
// var hbs=require('hbs');
// hbs.registerPartials(__dirname+'/views/partials',function(err){});

// app.use(express.json());
// app.use(cors());

// //routes below 
// app.get('/',(req,res)=>{
//     res.send("working");
// });
// app.get("/home",(req,res)=>{
//     res.render("home",{
//         username:"ishi",
//         posts:"flana dhimkana"
//     })
// });

// app.get("/alluser",(req,res)=>{
//     const user=[
//         {username:"ishi",age:19},
//         {username:"harleen",age:50},
//         {username:"leen",age:20}
//     ];
//     res.render("alluser",{
//         user:user
//     });
// });
// //error handling middleware 
// app.use(errorHandler)


// app.use("/api/register",require("./routes/userRoutes"));

// app.use("/api/details",require("./routes/doctorsDetails"));

// // app.post('/profile', upload.single('avatar'), function (req, res, next) {
// //     // req.file is the `avatar` file
// //     // req.body will hold the text fields, if there were any
// //     console.log(req.body);
// //     console.log(req.file);
// //     return res.redirect("/home");  //for redirecting it back to the home 
// //   });

// //   const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, '/tmp/my-uploads')
// //     },
// //     filename: function (req, file, cb) {
// //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// //       cb(null, file.fieldname + '-' + uniqueSuffix)
// //     }
// //   })
  
// //   const upload = multer({ storage: storage })

// let gfs;
// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');  // Set the collection name for files
// });

// // Set up multer storage in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Upload endpoint
// app.post('/upload', upload.single('file'), async (req, res) => {
//     if (!req.file) return res.status(400).send('No file uploaded.');

//     const readableStream = new Readable();
//     readableStream.push(req.file.buffer);
//     readableStream.push(null);

//     const writeStream = gfs.createWriteStream({
//         filename: req.file.originalname,
//         content_type: req.file.mimetype
//     });

//     readableStream.pipe(writeStream);

//     writeStream.on('close', (file) => {
//         res.status(201).json({ message: "File uploaded successfully", file });
//     });

//     writeStream.on('error', (err) => {
//         console.error("Error uploading file:", err);
//         res.status(500).send('Error uploading file');
//     });
// });

// // Retrieve file endpoint
// app.get('/file/:filename', async (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         if (!file || file.length === 0) {
//             return res.status(404).json({ err: 'No file exists' });
//         }
        
//         // File exists, serve it as a stream
//         const readstream = gfs.createReadStream(file.filename);
//         res.set('Content-Type', file.contentType);
//         readstream.pipe(res);
//     });
// });

// //app config start 
// app.listen(port,()=>{
//     console.log(`server running on port http://localhost:${port}`);
// })

const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const multer = require('multer');
const File = require('./model/file'); // Import the File model

dotenv.config();
connectDb(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
        username: "Hiya",
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

// Error handling middleware
app.use(errorHandler);

app.use("/api/register",require("./routes/userRoutes"));

app.use("/api/details",require("./routes/doctorsDetails"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
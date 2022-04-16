const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");

require('dotenv').config();

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;


//routes
const userAdmin = require("./routes/userAdmin");
app.use("/admin",userAdmin);

const userStudent = require("./routes/userStudent");
app.use("/student",userStudent);


const bookings = require("./routes/bookings");
app.use("/booking",bookings);

const slots = require("./routes/slots");
    app.use("/slot",slots);    

app.get('/hello',check,(req,res)=>{
    console.log("hello");
    res.send('hello world');
});

app.post('/dummy',(req,res)=>{
    console.log("In dummy");
    console.log(req.body.name);
    console.log(req.body.id);
    res.status(201).send({ message: "User created successfully", name : req.body.name });
});

function check(req,res,next){
    console.log("check");
    next();
}; 


app.listen(port,()=>{
    console.log("Server started on port"+ `${port}`)
});
const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWTPRIVATEKEY;

const {userModel,validateUser} = require("./../models/user.model");
const { request } = require("express");

//get student users
router.get("/",async (req,res) => {
    try{
        const students = await userModel.find({type:"student"});
        res.json(students);
        console.log("STUDENTS : "+ `${students}`);
    }
    catch(err){
        res.json({message: err});
    }
});

router.post("/signup", async(req, res) => {
    try{
        // console.log("Here");
        console.log(req.body);
        req.body.type = "student";
        const {error} = validateUser(req.body);
        // console.log(error);
        if(error)
            return res.json({status: 400, message : error.details[0].message}); //res.status(400).send({message : error.details[0].message})
        // console.log("User validated");
        const user = await userModel.findOne({email:req.body.email})
        // console.log(user);
        if(user)
            return res.json({status: 400, message :"Email already in use!!"});
        // console.log("Email validated");
        const newStudentUser = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,11),
            type: req.body.type
        });
        const savedStudent = await newStudentUser.save();
        console.log("savedStudent" + `${savedStudent}`);
        return res.json({status: 201, message : "User created successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.post('/signin',async (req,res) => {
    try{
        
        const student = await userModel.findOne({email:req.body.email, type:"student"});
        if(!student)
        {   
            console.log("Email not in Student Data");
            return res.status(401).send({message: "Invalid Email or Password"});
        }
        const validPwd = await bcrypt.compare(
            req.body.password, student.password
        );
        if(!validPwd)
        {   
            console.log("Student: Password not valid");
            return res.status(401).send({message: "Invalid Email or Password"});
        }
        const token = student.generateAuthToken();
        console.log("Log in successful");
        return res.status(201).send({data: token, message: "Logged In successfully"});//res.json({status: 201, data: token, message: "Logged In successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

//get user data
router.post("/getuserdata",async (req,res) => {
    try{
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                // console.log(err.message);
                res.json({message:err});
            }
            else{
                // console.log(decodedToken);
                let userdata=await userModel.findOne({_id:decodedToken._id});
                res.json(userdata);
            }
        })
    }
    catch(err){
        res.json({message: err});
    }
});

// update user data
router.post("/updateuserdata",async (req,res) => {
    try{
        const token=req.body.token;
        const newdata=req.body.newdata;
        // {
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3YjRmOTE5Y2NlMmJjNjRiMGE5NmEiLCJpYXQiOjE2NDk5MTgzMjEsImV4cCI6MTY1MDUyMzEyMX0.BF7UaQ5j1xO8efDX46pZSsxjXdDBqCKae81FMTEBmsk",
        //     "newdata":{"firstName":"student19","lastName":"student28","roomNum":229}
        // }
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                console.log(err.message);
                res.json({message:err});
            }
            else{
                await userModel.updateOne(
                    { _id: decodedToken._id },
                    { $set:
                       {
                            "firstName": newdata.firstName,
                            "lastName": newdata.lastName,
                            "roomNum": newdata.roomNum
                       }
                    }
                )
                res.json({message: "User data updated successfully"});
            }
        })
    }
    catch(err){
        res.json({message: err});
    }
});

module.exports = router;
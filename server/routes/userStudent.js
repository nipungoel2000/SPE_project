const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWTPRIVATEKEY;

const {userModel,validateUser} = require("./../models/user.model");

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
            return res.json({status: "error", message : error.details[0].message}); //res.status(400).send({message : error.details[0].message})
        // console.log("User validated");
        const user = await userModel.findOne({email:req.body.email})
        // console.log(user);
        if(user)
            return res.status(400).send({message: "Email already in use!!"});
        // console.log("Email validated");
        const newStudentUser = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,11),
            type: req.body.type,
        });
        const savedStudent = await newStudentUser.save();
        console.log("savedStudent" + `${savedStudent}`);
        return res.status(201).send({ message: "User created successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.post('/signin',async (req,res) => {
    try{
        // const {, password} = req.body;
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
        res.status(200).send({data: token, message: "Logged In successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;
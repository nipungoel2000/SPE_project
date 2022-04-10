const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWTPRIVATEKEY;

const {userModel,validateUser} = require("./../models/user.model");

//get admin users
router.get("/",async (req,res) => {
    try{
        const admins = await userModel.find({type:"admin"});
        res.json(admins);
        console.log("ADMINS : "+ `${admins}`);
    }
    catch(err){
        res.json({message: err});
    }
});

router.post("/signup", async(req, res) => {
    try{
        // console.log("Here");
        console.log(req.body);
        req.body.type = "admin";
        const {error} = validateUser(req.body);
        // console.log(error);
        if(error)
            return res.json({status: 400, message : error.details[0].message}); //res.status(400).send({message : error.details[0].message})
        // console.log("User validated");
        const user = await userModel.findOne({email:req.body.email})
        // console.log(user);
        if(user)
            return res.json({status: 400, message: "Email already in use!!"});
        // console.log("Email validated");
        const newAdminUser = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,11),
            type: req.body.type,
        });
        const savedAdmin = await newAdminUser.save();
        console.log("savedAdmin" + `${savedAdmin}`);
        return res.json({status: 201,message: "User created successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.post('/signin',async (req,res) => {
    try{
        // const {, password} = req.body;
        const admin = await userModel.findOne({email:req.body.email, type:"admin"});
        if(!admin)
        {   
            console.log("Email not in Admin Data");
            return res.json({status: 401, message: "Invalid Email or Password"});
        }
        const validPwd = await bcrypt.compare(
            req.body.password, admin.password
        );
        if(!validPwd)
        {   
            console.log("Admin: Password not valid");
            return res.json({status: 401, message: "Invalid Email or Password"});
        }
        const token = admin.generateAuthToken();
        console.log("Log in successful");
        return res.json({status: 201, data: token, message: "Logged In successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;
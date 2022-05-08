const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWTPRIVATEKEY;

const {userModel,validateUser} = require("./../models/user.model");
const logger = require("../logging/logConfig");

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
        {
            logger.error("error inside signin method - message from winston");
            return res.status(400).send({message : error.details[0].message}); //res.status(400).send({message : error.details[0].message})
        }
        // console.log("User validated");
        const user = await userModel.findOne({email:req.body.email})
        // console.log(user);
        if(user)
        {
            logger.error("Email already in use - message from winston");
            return res.status(400).send({message: "Email already in use!!"});
        }
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
        logger.info("admin user signed up successfully - message from winston");
        return res.status(201).send({message: "User created successfully" });
    }catch(err){
        console.log(err);
        logger.error("error inside signup method - message from winston");
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.post('/signin',async (req,res) => {
    try{
        
        const admin = await userModel.findOne({email:req.body.email, type:"admin"});
        if(!admin)
        {   
            console.log("Email not in Admin Data");
            logger.error("Invalid Email or Password - message from winston");
            return res.status(401).send({message: "Invalid Email or Password"});
            // return res.json({status: 401, message: "Invalid Email or Password"});
        }
        const validPwd = await bcrypt.compare(
            req.body.password, admin.password
        );
        if(!validPwd)
        {   
            console.log("Admin: Password not valid");
            logger.error("Invalid Email or Password - message from winston");
            return res.status(401).send({message: "Invalid Email or Password"});
            // return res.json({status: 401, message: "Invalid Email or Password"});
        }
        const token = admin.generateAuthToken();
        console.log("Log in successful");
        logger.info("admin user signed in successfully - message from winston");
        return res.status(201).send({data: token, message: "Logged In successfully"});
    }catch(err){
        console.log(err);
        logger.error("error inside signin method - message from winston");
        return res.status(500).send({message: "Internal Server Error"});
    }
});

//get admin data
router.post("/getdata",async (req,res) => {
    logger.info("inside getdata method - message from winston");
    try{
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                // console.log(err.message);
                logger.error("unauthorized access inside getdata method - message from winston");
                res.status(400).send({message:err});
            }
            else{
                console.log(decodedToken);
                let userdata=await userModel.findOne({_id:decodedToken._id});
                res.status(201).send({data:userdata});
            }
        })
    }
    catch(err){
        logger.error("error inside getdata method - message from winston");
        res.status(500).send({message: err});
    }
});

//get user name
router.post("/getname",async (req,res) => {
    logger.info("inside getname method - message from winston");
    try{
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                // console.log(err.message);
                logger.error("unauthorized access inside getname method - message from winston");
                res.status(400).send({message:err});
            }
            else{
                // console.log(decodedToken);
                let userdata=await userModel.findOne({_id:decodedToken._id});
                res.status(201).send({name:userdata.firstName});
            }
        })
    }
    catch(err){
        logger.error("error inside getname method - message from winston");
        res.status(500).send({message: err});
    }
});

//get admin name
// router.post("/getname",async (req,res) => {
//     logger.info("inside getname method - message from winston");
//     console.log("yoooo");
//     try{
//         const token=req.body.token;
//         jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
//             if(err){
//                 // console.log(err.message);
//                 logger.error("unauthorized access inside getname method - message from winston");
//                 res.status(400).send({message:err});
//             }
//             else{
//                 // console.log(decodedToken);
//                 let userdata=await userModel.findOne({_id:decodedToken._id});
//                 res.status(201).send({name:userdata.firstName});
//             }
//         })
//     }
//     catch(err){
//         logger.error("error inside getname method - message from winston");
//         res.status(500).send({message: err});
//     }
// });

// update admin data
router.post("/updatedata",async (req,res) => {
    logger.info("inside updatedata method - message from winston");
    try{
        const token=req.body.token;
        const newdata=req.body.newdata;
        // {
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3YjRmOTE5Y2NlMmJjNjRiMGE5NmEiLCJpYXQiOjE2NDk5MTgzMjEsImV4cCI6MTY1MDUyMzEyMX0.BF7UaQ5j1xO8efDX46pZSsxjXdDBqCKae81FMTEBmsk",
        //     "newdata":{"firstName":"student19","lastName":"student28"}
        // }
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                logger.error("unauthorized access inside updatedata method - message from winston");
                console.log(err.message);
                res.status(400).send({message:err});
            }
            else{
                await userModel.updateOne(
                    { _id: decodedToken._id },
                    { $set:
                       {
                            "firstName": newdata.firstName,
                            "lastName": newdata.lastName,
                       }
                    }
                )
                res.status(201).send({message: "Admin data updated successfully"});
            }
        })
    }
    catch(err){
        logger.error("error inside updatedata method - message from winston");
        res.status(400).send({message: err});
    }
});

// delete user data
router.post("/deleteuser",async(req,res)=>{
    logger.info("inside deleteuser method - message from winston");
    try{
        if(req.body.type=="admin")
        {
            const deleteBooking = await userModel.deleteOne({email:req.body.email});
            res.status(201).send({deletedBooking: deleteBooking});
        }
        else
        {
            logger.error("error inside deleteuser method - message from winston");
            res.status(400).send({message:"User type is not admin"});
        }
    }
    catch(err){
        logger.error("error inside deleteuser method - message from winston");
        res.status(400).send({message:err})
        // console.log("here");
    }
});
module.exports = router;
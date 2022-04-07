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

router.post("/add", async(req, res) => {
    try{
        // console.log("Here");
        console.log(req.body);
        req.body.type = "admin";
        const {error} = validateUser(req.body);
        if(error)
            return res.json({status: "error", message : error.details[0].message}); //res.status(400).send({message : error.details[0].message})
        // console.log("User validated");
        const user = await userModel.findOne({email:req.body.email});
        if(user)
            return res.status(400).send({message: "Email already in use!!"});
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
        return res.status(201).send({ message: "User created successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;
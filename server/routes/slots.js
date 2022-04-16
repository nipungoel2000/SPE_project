const express = require("express");
const router = require("express").Router();
const slotModel = require("./../models/slot.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {userModel,validateUser} = require("./../models/user.model");
var numBookings_slot = 6;

//GET ALL ACTIVE SLOTS
router.get("/",async (req,res) => {
    try{
        const activeSlots = await slotModel.find({status:"active"});
        res.json(activeSlots);
        console.log("active slots : "+ `${activeSlots}`);
    }
    catch(err){
        res.json({message: err});
    }
});

//ADD a new SLOT 
//req.body({date, startTime, endTime, floor, #teams})
router.post('/add',async(req,res) => 
{
    try{
        console.log(req.body);
        //TOKEN CHECK(IF TO BE DONE)
        //TO DO : MULTIPLY BY TEAM SIZE
        const filter = {date : req.body.date, startTime : req.body.startTime, endTime : req.body.endTime, floor : req.body.floor};
        const slot = await slotModel.findOne(filter);    
        if(slot)
        {   
            console.log("Previous total bookings " + `${slot["totalBookings"]}`);
            var curCnt = slot["totalBookings"];
            //update totalBookings and  .. increment by numBookings_slot for half an hour window
            //TO DO : MULTIPLY BY TEAM SIZE
            const updatedSlot = await slotModel.updateOne(filter,{$set:{totalBookings: (curCnt + numBookings_slot)}});
            console.log(updatedSlot);
            return res.status(201).send({message: "Slot added successfully" });
        }
        else
        {
            const newSlot = new slotModel({
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                floor: req.body.floor,
                status : "active",
                totalBookings : numBookings_slot,
                bookingsMade : 0,
            });
            const savedSlot = await newSlot.save();
            console.log("savedSlot" + `${savedSlot}`);
            return res.status(201).send({message: "Slot added successfully" });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Addition of slot failed"});
    }
});

//FETCH AVAILABLE SLOTS FOR A USER BY ITS TOKEN
router.post('/fetch',async(req,res) => {
    try {
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                // console.log(err.message);
                // console.log("Here");
                res.status(400).send({message:err});
            }
            else{
                // console.log(decodedToken);
                let userdata=await userModel.findOne({_id:decodedToken._id});
                const email = userdata.email; 
                const roomNum = userdata.roomNum;
                var floorNum = Math.floor(roomNum/100); //Assuming roomNum is always of 3 digits
                console.log(floorNum);
                const availableSlots = await slotModel.find({floor:floorNum, status:"active"});
                console.log(availableSlots);
                // console.log("In else");
                res.status(200).send({availableSlots:availableSlots});
            }
        })
    } catch (error) {
        // console.log("Here2");
        res.status(500).send({message: error});
    }
});

module.exports = router;
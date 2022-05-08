const express = require("express");
const router = require("express").Router();
const slotModel = require("./../models/slot.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {userModel,validateUser} = require("./../models/user.model");
const logger = require("../logging/logConfig");

var numBookings_slot = 6;

//GET ALL ACTIVE SLOTS
router.get("/",async (req,res) => {
    logger.info("inside getallslots method - message from winston");
    try{
        const activeSlots = await slotModel.find({status:"active"});
        res.json(activeSlots);
        console.log("active slots : "+ `${activeSlots}`);
    }
    catch(err){
        logger.error("error inside getallslots method - message from winston");
        res.json({message: err});
    }
});

//ADD a new SLOT 
//req.body({date, startTime, endTime, floor, #teams})
router.post('/add',async(req,res) => 
{
    logger.info("inside addslot method - message from winston");
    try{
        console.log(req.body);
        //TOKEN CHECK(IF TO BE DONE)
        //TO DO : MULTIPLY BY TEAM SIZE
        var teams=req.body.teams;
        const filter = {date : req.body.date, startTime : req.body.startTime, endTime : req.body.endTime, floor : req.body.floor};
        const slot = await slotModel.findOne(filter);    
        if(slot)
        {   
            console.log("Previous total bookings " + `${slot["totalBookings"]}`);
            var curCnt = slot["totalBookings"];
            //update totalBookings and  .. increment by numBookings_slot for half an hour window
            //TO DO : MULTIPLY BY TEAM SIZE
            const updatedSlot = await slotModel.updateOne(filter,{$set:{totalBookings: (curCnt + teams*numBookings_slot)}});
            console.log(updatedSlot);
            return res.status(201).send({message: "Slot added successfully" });
        }
        else
        {
            var count=teams*numBookings_slot
            const newSlot = new slotModel({
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                floor: req.body.floor,
                status : "active",
                totalBookings : count,
                bookingsMade : 0,
            });
            const savedSlot = await newSlot.save();
            console.log("savedSlot" + `${savedSlot}`);
            return res.status(201).send({message: "Slot added successfully" });
        }
    }
    catch(err){
        logger.error("error inside addslot method - message from winston");
        console.log(err);
        return res.status(500).send({message: "Addition of slot failed"});
    }
});

//FETCH AVAILABLE SLOTS FOR A USER BY ITS TOKEN AND DATE
router.post('/fetch',async(req,res) => {
    logger.info("inside fetchslots method - message from winston");
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
                // console.log(floorNum);
                // console.log(req.body.date);
                const availableSlots = await slotModel.find({floor:floorNum, status:"active", date:req.body.date});
                // console.log(availableSlots[0].startTime);
                var timeSlotlst = [];
                for(let i=0; i<availableSlots.length; i++)
                {
                    if(availableSlots[i].totalBookings>availableSlots[i].bookingsMade)
                    {
                        var slot = availableSlots[i].startTime + " - " + availableSlots[i].endTime;
                        timeSlotlst.push(slot);
                    }
                }
                timeSlotlst.sort();
                var timeSlots = []
                for(var i= 0; i<timeSlotlst.length; i++)
                {
                    timeSlots.push({value : timeSlotlst[i]});
                }
                console.log(timeSlots);
                res.status(200).send({availableSlots : timeSlots});
            }
        })
    } catch (error) {
        logger.error("error inside fetchslots method - message from winston");
        // console.log("Here2");
        res.status(500).send({message: error});
    }
});

module.exports = router;
const express = require("express");
const { update } = require("./../models/slot.model");
const router = require("express").Router();
const slotModel = require("./../models/slot.model");

var numBookings_slot = 6;
//get all active slots
router.get("/",async (req,res) => {
    try{
        const activeSlots = await slotModel.find({status:"admin"});
        res.json(activeSlots);
        console.log("active slots : "+ `${activeSlots}`);
    }
    catch(err){
        res.json({message: err});
    }
});

router.post('/add',async(req,res) => 
{
    try{
        console.log(req.body);
        //TOKEN CHECK(IF TO BE DONE)
        const filter = {date : req.body.date, startTime : req.body.startTime, endTime : req.body.endTime, floor : req.body.floor};
        const slot = await slotModel.findOne(filter);    
        if(slot)
        {   
            console.log("Previous total bookings " + `${slot["totalBookings"]}`);
            var curCnt = slot["totalBookings"];
            //update totalBookings and  .. increment by numBookings_slot for half an hour window
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

module.exports = router;
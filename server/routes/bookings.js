const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWTPRIVATEKEY;

const bookingModel = require("./../models/booking.model");
const slotModel = require("./../models/slot.model");

const {userModel,validateUser} = require("./../models/user.model");

// make a new booking
// req.body(token,startTime,endTime,date)
router.post("/make",async (req,res) =>{
    try{
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                // console.log(err.message);
                res.status(400).send({message:err});
            }
            else{
                // console.log(decodedToken);
                let userdata=await userModel.findOne({_id:decodedToken._id});
                const email=userdata.email;
                const roomNum=userdata.roomNum;
                if(roomNum==null)
                {
                    return res.status(401).send({message: "Booking failed, please add your room number on the user profile page first"});
                }
                const filter_booking = {email: email, status: "active"};
                const userslot=await bookingModel.findOne(filter_booking);
                console.log(userslot);
                if(userslot)
                {
                    return res.status(401).send({message: "Active booking already exists"});
                }
                const floor=Math.floor(roomNum/100);
                const filter = {date : req.body.date, startTime : req.body.startTime, endTime : req.body.endTime, floor : floor,status: "active"};
                const slot=await slotModel.findOne(filter);
                if(slot)
                {
                    const available_bookings=slot.totalBookings-slot.bookingsMade;
                    const new_bookingsMade=slot.bookingsMade+1;
                    console.log(new_bookingsMade);
                    if(available_bookings>0)
                    {
                        //  
                        await slotModel.updateOne(
                            { _id: slot._id },
                            { $set:
                               {
                                    "bookingsMade": new_bookingsMade
                               }
                            }
                        )
                        const newBooking = new bookingModel({
                            email:email,
                            roomNum:roomNum,
                            date : req.body.date,
                            startTime:req.body.startTime,
                            endTime : req.body.endTime,
                        });
                        const savedBooking = await newBooking.save();
                        console.log("savedBooking"+`${savedBooking}`);
                        // console.log(savedBooking._id);
                        return res.status(201).send({message : "Booking created successfully", bookingId : savedBooking._id});
                    }
                    else
                    {
                        return res.status(401).send({message: "Booking failed, no slot available"});
                    }
                }
                else
                {
                    return res.status(401).send({message: "Booking failed, no slot available"});
                }
            }
        })
    }
    catch(err){
        res.status(500).send({message: err});
    }
});

//req.body(token)
router.post("/fetchbytoken",async (req,res) => 
{
    try{
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                res.status(400).send({message:err});
            }
            else{
                // console.log(decodedToken);
                let userdata=await userModel.findOne({_id:decodedToken._id});
                const email=userdata.email;
                let bookingData = await bookingModel.findOne({email:email, status:"active"});
                let bookings=[];
                bookings.push(bookingData);
                res.status(201).send({bookingData:bookings});
            }
        })        
    }
    catch(err){
        res.status(500).send({message:err});
    }
});

// req.body(token)
// url + id
router.delete('/delete/:id',async (req,res)=>{
    try{
        const token=req.body.token;
        jwt.verify(token,process.env.JWTPRIVATEKEY,async (err,decodedToken) =>{
            if(err){
                res.status(400).send({message:err});
            }
            else{
                try{
                    let bookingData = await bookingModel.findOne({_id:req.params.id});
                    const roomNum=bookingData.roomNum;
                    const floor=Math.floor(roomNum/100);
                    const filter = {date : bookingData.date, startTime : bookingData.startTime, endTime : bookingData.endTime, floor : floor,status: "active"};
                    const slot=await slotModel.findOne(filter);
                    if(slot)
                    {
                        const new_bookingsMade=slot.bookingsMade-1;
                        console.log(new_bookingsMade);
                        //  
                        await slotModel.updateOne(
                            { _id: slot._id },
                            { $set:
                            {
                                    "bookingsMade": new_bookingsMade
                            }
                            }
                        )
                        const deleteBooking = await bookingModel.deleteOne({_id:req.params.id});
                        res.status(201).send({deletedBooking: deleteBooking});
                    }
                  }catch(err){
                    res.status(400).send({message:err})
                    // console.log("here");
                  }
            }
        })        
    }
    catch(err){
        res.status(500).send({message:err});
    }
    
  })

//returns all active bookings in custom sorted order as per argument in API
//req.body(sortby,date) ---> sortby:RoomNumber or Time, date:All or date(in string)
router.post("/fetchall",async (req,res) =>
{
    try{    
        var filter = {status:"active"};
        if(req.body.date!="All")
            filter = {status:"active", date:req.body.date};
        const activeBookings = await bookingModel.find(filter);
        var activeBookingslst = []
        for(var i = 0; i<activeBookings.length; i++)
        {   
            var curBooking = {"BookingId" : activeBookings[i]._id, "email" : activeBookings[i].email, "roomNum" : activeBookings[i].roomNum, "date" : activeBookings[i].date, "startTime" : activeBookings[i].startTime,"endTime" : activeBookings[i].endTime};
            activeBookingslst.push(curBooking);
        }
        if(req.body.sortby == "RoomNumber")
        {   
            // console.log("Sorting by room number");
            activeBookingslst.sort(sortBy("roomNum","date","time"));
        }
        else
            activeBookingslst.sort(sortBy("date","time","roomNum"));
        return res.status(201).send({bookingsLst : activeBookingslst});
    }
    catch(err){
        res.status(500).send({message:err});
    }  
});
function sortBy(field1, field2, field3)
{
    return function(a,b){
        if(a[field1]<b[field1])
            return -1;
        else if(a[field1]>b[field1])
            return 1;
        else
        {
            if(a[field2]<b[field2])
                return -1;
            else if(a[field2]>b[field2])
                return 1;
            else
            {
                if(a[field3]<b[field3])
                    return -1;
                else if(a[field3]>b[field3])
                    return 1;    
                else
                    return 0;            
            }
        }
    }
}

module.exports = router;
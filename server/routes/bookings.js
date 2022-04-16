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
                    return res.status(400).send({message: "Booking failed, room number not provided"});
                }
                const filter_booking = {email: email, status: "active"};
                const userslot=await bookingModel.findOne(filter_booking);
                console.log(userslot);
                if(userslot)
                {
                    return res.status(400).send({message: "Active booking already exists"});
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
                        return res.status(201).send({message : "Booking created successfully" });
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
        res.json({message: err});
    }
});
module.exports = router;
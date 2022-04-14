const { time } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema(
    {
        date: {type: String, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required:true},
        floor: {type: Number, required: true},
        status: {type: String, required: true, default:"active"}, //active,expired
        totalBookings: {type:Number,required: true},
        bookingsMade : {type:Number, required:true},
    },
    {timestamps: true}
);

const slotModel = mongoose.model("slotsData",slotSchema,"slotsData");

module.exports = slotModel;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {   
        email: {type: String, required : true},
        roomNum: {type: Number,required : true}, 
        date: {type: String, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required:true},
        status: {type: String, required: true, default:"active"}, //active,expired
    },
    {timestamps: true}
);

const bookingModel = mongoose.model("bookingsData",bookingSchema,"bookingsData");

module.exports = bookingModel;


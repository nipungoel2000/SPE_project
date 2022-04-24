const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const slotModel = require("./models/slot.model");
const bookingModel = require("./models/booking.model");
const cron = require('node-cron');
require('dotenv').config();

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;


//routes
const userAdmin = require("./routes/userAdmin");
app.use("/admin",userAdmin);

const userStudent = require("./routes/userStudent");
app.use("/student",userStudent);


const bookings = require("./routes/bookings");
app.use("/booking",bookings);

const slots = require("./routes/slots");
    app.use("/slot",slots);    

app.get('/hello',check,(req,res)=>{
    console.log("hello");
    res.send('hello world');
});

app.post('/dummy',(req,res)=>{
    console.log("In dummy");
    console.log(req.body.name);
    console.log(req.body.id);
    res.status(201).send({ message: "User created successfully", name : req.body.name });
});

function check(req,res,next){
    console.log("check");
    next();
}; 

app.listen(port,()=>{
    console.log("Server started on port"+ `${port}`)
})

function getstrDate(datetime){
    var month = datetime.getMonth();
    month += 1;
    var date_str=datetime.getDate()+"-";
    if(datetime.getDate()<10)
        date_str='0'+date_str;
    if(month<10)
        date_str=date_str+'0';
    date_str=date_str+month+"-"+datetime.getFullYear();
    return date_str;
}

function getstrTime(datetime){
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var time_str = hour+".";
    if(hour<10)
        time_str = '0' + time_str;
    if(minute<=9)
        time_str = time_str + '0';
    time_str = time_str + minute;
    return time_str;
}

//compare 2 dates in string format
//return 0 if date1==date2, 1 if date1>date2 and -1 if date1<date2
function compareDates(date1,date2)
{
    var y1 = date1.slice(6,10);
    var y2 = date2.slice(6,10);
    if(y1<y2)
        return -1;
    else if(y2>y1)
        return 1;
    else{
        var m1 = date1.slice(3,5);
        var m2 = date2.slice(3,5);
        if(m1<m2)
            return -1;
        else if(m2>m1)
            return 1;
        else
        {
            var d1 = date1.slice(0,2);
            var d2 = date2.slice(0,2);
            if(d1<d2)
                return -1;
            else if(d2>d1)
                return 1;
            else
                return 0;
        }
    }
}

async function job(datetime){
    try{
        // var datetime = new Date();
        var strDate = getstrDate(datetime);
        var strTime = getstrTime(datetime);
        console.log("Inside Cron Job");
        const activeSlots = await slotModel.find({status:"active"});
        // console.log("active slots : "+ `${activeSlots}`);
        for(var i = 0; i<activeSlots.length; i++)
        {   
            var date_cmp = compareDates(strDate,activeSlots[i].date);
            if(date_cmp==1 || (date_cmp==0 && strTime>activeSlots[i].endTime)) //strdate>slot.date
            {
                const updatedSlot = await slotModel.updateOne({_id:activeSlots[i]._id},{$set:{status:"expired"}});
                console.log("updated slot : ", updatedSlot);
            }
        }

        const activeBookings = await bookingModel.find({status:"active"});
        for(var i = 0; i<activeBookings.length; i++)
        {   
            var date_cmp = compareDates(strDate,activeBookings[i].date);
            if(date_cmp==1 || (date_cmp==0 && strTime>activeBookings[i].endTime)) //strdate>slot.date
            {
                const updatedBooking = await bookingModel.updateOne({_id:activeBookings[i]._id},{$set:{status:"expired"}});
                console.log("updated booking : ", updatedBooking);
            }
        }        
    }
    catch(err){
        console.log("message : ", err);
    }
}
cron.schedule('0 1,31 * * * *', () => {job(new Date())});
// job();
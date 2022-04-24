//https://stackoverflow.com/questions/584770/how-would-i-get-a-cron-job-to-run-every-30-minutes
// const cron = require('node-cron');
const slotModel = require("./models/slot.model");
//Will run at (1:01,1:31,2:01,2:31 and so on)
// cron.schedule('1 31 * * * *', function()
// {
//     console.log("This is cron job");
// });

console.log("In main");
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
var datetime = new Date();
var strDate = getstrDate(datetime);
var strTime = getstrTime(datetime);
console.log(strDate);
console.log(strTime);
console.log(compareDates(strDate,strDate));

async function cronjob(){
    try{
        console.log("Inside Cron Job");
        const activeSlots = await slotModel.find({status:"active"});
        console.log("active slots : "+ `${activeSlots}`);
    }
    catch(err){
        res.json({message: err});
    }
}

cronjob();
// console.log(datetime.toLocaleTimeString().slice(0,));
// console.log(datetime.toISOString().slice(0,10));
// async function()
// {

// }

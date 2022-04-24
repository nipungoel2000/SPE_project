const cron = require('node-cron');

cron.schedule('* * * * *', function()
{
    console.log("This is cron job");
});

console.log("In main");

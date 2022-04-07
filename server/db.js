const mongoose = require("mongoose");

module.exports = () => {
    const connectionsParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify:false,
    };
    const uri = process.env.DB_URI;
    mongoose.connect(uri, connectionsParams)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error(err);
    });
}
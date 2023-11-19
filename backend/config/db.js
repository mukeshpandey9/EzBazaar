const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected sucessfully to ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Connection to MOngodb FAiled");
      console.log(err);
    });
};

module.exports = connectDB;

const mongoose = require('mongoose');


const connectDB = async () => {
   mongoose
     .connect(process.env.DB_URI, {})
     .then(() => console.log("DB connected"))
     .catch((err) => console.log(err));
}

module.exports = connectDB;


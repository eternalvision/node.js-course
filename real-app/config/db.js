require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_STRING } = process.env;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_STRING);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = connectDB;

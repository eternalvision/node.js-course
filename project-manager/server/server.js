const mongoose = require("mongoose");

const { MONGO_STRING } = process.env;

mongoose
    .connect(MONGO_STRING)
    .then(() => {
        console.log("Connect to MongoDB");
    })
    .catch((err) => {
        console.error("Could not connect to MongoDB");
    });

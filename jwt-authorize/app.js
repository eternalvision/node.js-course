const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/users");

const { MONGO_STRING, PORT } = process.env;

const app = express();

mongoose
    .connect(MONGO_STRING)
    .then(() => {
        console.log("Connected success");
    })
    .catch((err) => console.error(err));

app.use(bodyParser.json()); //express.json()
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", userRoutes);

app.listen(PORT || 3000);

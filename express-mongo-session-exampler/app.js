require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

const { MONGO_STRING, PORT, SECRET_KEY } = process.env;

mongoose
    .connect(MONGO_STRING)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.log(`MongoDB Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: MONGO_STRING,
            collectionName: "sessions",
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    }),
);

app.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`Count watchers: ${req.session.views}`);
    } else {
        req.session.views = 1;
        res.send("Hello to the page, reload please");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("Logout Error");
        res.send("Logout success");
    });
});

app.listen(PORT || 3000);

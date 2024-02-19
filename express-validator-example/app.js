require("dotenv").config();
const express = require("express");
const { connect, Schema, model } = require("mongoose");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();

const { PORT, MONGO_STRING } = process.env;

connect(MONGO_STRING);

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = model("User", userSchema);

app.use(bodyParser.json());

app.post(
    "/registr",
    [
        body("username").isString().trim().isLength({ min: 5 }),
        body("password").isString().trim().isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send("User created");
    },
);

app.post(
    "/login",
    [body("username").isString().trim(), body("password").isString().trim()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).send("User authenticated");
        } else {
            res.status(401).send("Authenticated failed");
        }
    },
);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

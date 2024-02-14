require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { PORT, SECRET_KEY } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }),
);

const users = {};

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users[username] = hashedPassword;
    console.log(users);
    res.send("Registration success");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users[username];
    console.log(users);

    if (user && (await bcrypt.compare(password, user))) {
        req.session.userId = username;
        res.send("You login success");
    } else {
        res.send("Authenticated Error");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Sign-out success");
});

app.get("/profile", (req, res) => {
    console.log(users);
    if (!req.session.userId) {
        return res.status(401).send("ERROR! You must be login");
    }
    res.send(`User profile: ${req.session.userId}`);
});

app.listen(PORT);

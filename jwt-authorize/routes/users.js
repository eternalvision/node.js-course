require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/registration", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email is already use!" });
        }
        user = new User({ username, email });
        user.setPassword(password);
        await user.save();
        res.status(201).json({ message: "User created!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.validPassword(password)) {
            return res
                .status(400)
                .json({ message: "Uncorrect email or password!" });
        }
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/list", auth, (req, res) => {
    res.json({
        message: `Page List has accepted for user ${req.user.username}`,
    });
});

module.exports = router;

const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const newUser = new User({
            name,
            projects: [],
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate("projects");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("projects");
        if (!user) return res.status(404).send("User not found");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { name },
            { new: true },
        );
        if (!user) return res.status(404).send("User not found");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).send("User not found");
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

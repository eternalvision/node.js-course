const express = require("express");
const userRouter = express.Router();
const { Users } = require("./data");

userRouter.get("/", (req, res) => {
    res.send(JSON.stringify(Users));
});

userRouter.post("/create", (req, res) => {
    Users.push({ id: Users.length + 1, ...req.body });
    res.send(JSON.stringify(Users));
});

module.exports = userRouter;

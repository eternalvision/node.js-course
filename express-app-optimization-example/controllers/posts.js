const express = require("express");
const postRouter = express.Router();
const { Users, Posts } = require("./data");

postRouter.get("/", (req, res) => {
    res.send(JSON.stringify(Posts));
});

postRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = Users[id - 1];
    const post = Posts[id - 1];
    const data = { user: user, post: post };
    res.send(JSON.stringify(data));
});

postRouter.post("/create", (req, res) => {
    Posts.push({ id: Posts.length + 1, ...req.body });
    res.send(JSON.stringify(Posts));
});

module.exports = postRouter;

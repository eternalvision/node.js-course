const express = require("express");
const router = express.Router();

let users = [
    {
        id: 0,
        age: 25,
        name: "John",
    },
    {
        id: 1,
        age: 32,
        name: "Jane",
    },
    {
        id: 2,
        age: 23,
        name: "Kirill",
    },
    {
        id: 3,
        age: 29,
        name: "Stephan",
    },
    {
        id: 4,
        age: 35,
        name: "Stephan",
    },
    {
        id: 5,
        age: 27,
        name: "Sasha",
    },
];

router.use((req, res, next) => {
    const date = new Date();
    console.log("Time: ", date);
    next();
});

router.get("/find/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
});

router.get("/search", (req, res) => {
    const search = req.query.search?.toLowerCase();
    const limit = parseInt(req.query.limit, 10);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search),
    );

    const limitedUsers = limit ? filteredUsers.slice(0, limit) : filteredUsers;

    res.send(limitedUsers);
});

router.get("/get", (req, res) => {
    res.status(200).json(users);
});

router.post("/update", (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(user);
    res.status(201).json(user);
});

router.put("/update/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("User not found");
    user.name = req.body.name;
    res.status(201).json(user);
});

router.delete("/delete:id", (req, res) => {
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    if (!users) return res.status(404).send("User not found");
    res.status(204).send();
});

module.exports = router;

//? http://localhost:3101/users/5/ivan
//? http://localhost:3101/users?id=5&name=ivan

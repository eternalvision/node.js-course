const express = require("express");

const PORT = 3101;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const RequestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

let userData = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 35 },
];

const UserController = (req, res, next) => {
    if (req.url === "/users") {
        res.json(userData);
    } else if (req.url === "/") {
        res.send("Главная страница");
    }
};

app.use(RequestLogger);

app.use(UserController);

app.listen(PORT, () => {
    console.log("Server started");
});

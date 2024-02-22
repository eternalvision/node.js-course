const express = require("express");
const app = express();

// main middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

const GetInfo = (req, res, next) => {
    const { path } = req;
    if (path === "/") {
        console.log("This is log to main page");
        console.log(path);
    } else if (path === "/friends") {
        console.log("This is log to friends");
        console.log(path);
    }
    next();
};

app.get("/", GetInfo, (req, res) => {
    res.send("Main Page");
});

app.get("/friends", GetInfo, (req, res) => {
    res.send(
        JSON.stringify([
            { name: "Ivan", surname: "Petrov" },
            { name: "Petr", surname: "Ivanov" },
        ]),
    );
});

app.listen(3101);

const express = require("express");
const app = express();

// main middleware
// app.use((req, res, next) => {
//     console.log("Ненужная обработка для каждого запроса");
//     next();
// });

const GetInfo = (req, res, next) => {
    const { url } = req;
    if (url === "/") {
        console.log("This is log to main page");
        console.log(url);
    } else if (url === "/friends") {
        console.log("This is log to friends");
        console.log(url);
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

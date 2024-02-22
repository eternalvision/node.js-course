const express = require("express");
const path = require("path");

const app = express();
const oneWeek = 7 * 24 * 60 * 60 * 1000; //sec one week

app.use(
    express.static(path.join(__dirname, "public"), {
        maxAge: oneWeek,
    }),
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res, next) => {
    res.redirect("/");
    next();
});

app.listen(3101);

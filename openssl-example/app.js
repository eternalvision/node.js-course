const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world with HTTPS");
});

const httpsOptions = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert"),
};

https.createServer(httpsOptions, app).listen(3101, () => {
    console.log(`Server started at https://localhost:3101`);
});

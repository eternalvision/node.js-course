const express = require("express");
const { middleware } = require("apicache");
const axios = require("axios");

const PORT = 3101;

const app = express();

app.get("/api/data", middleware("2 hours"), async (req, res, next) => {
    try {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/photos",
        );
        res.json(data);
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    console.log(error);
    next();
});

app.listen(PORT);

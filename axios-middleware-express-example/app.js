const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3101;

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to the Express + Axios Example!");
});

app.get("/photos/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${id}/photos`,
        );
        res.json(data);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something broke!");
});

app.listen(PORT);

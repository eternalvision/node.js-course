const express = require("express");

const books = require("./books/books");

const app = express();

const PORT = 3101;

app.get("/books", (req, res) => {
    // res.json(null);
    // res.json(books); -> Content-Type application json
    res.send(null);
});

app.listen(PORT);

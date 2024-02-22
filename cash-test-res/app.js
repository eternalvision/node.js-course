const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// for page
app.get("/some-page", (req, res) => {
    res.set("Cache-Control", "public, max-age=86400");
    res.render("some-page", { layout: false });
});

// for api
app.get("/api/data", (req, res) => {
    res.set("ETag", "12345");
    res.json({ data: "This is api data" });
});

app.listen(3101);

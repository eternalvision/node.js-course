const { engine } = require("express-handlebars");
const moment = require("moment");
const express = require("express");
const PORT = 3101;

const hbs = engine({
    extname: ".handlebars",
    helpers: {
        formatDate: (date, format) => moment(date).format(format),
    },
});

const app = express();

app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

const articleDate = [
    {
        title: "Статья 1",
        publishDate: new Date(2023, 0, 1),
    },
    {
        title: "Статья 2",
        publishDate: new Date(2023, 1, 15),
    },
];

app.get("/", (req, res) => {
    res.render("home", { layout: false, articles: articleDate });
});

app.listen(PORT);

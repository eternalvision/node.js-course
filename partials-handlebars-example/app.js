const { engine } = require("express-handlebars");
const express = require("express");
const PORT = 3101;

const app = express();

const hbs = engine({
    extname: ".handlebars",
    partialsDir: ["./views/partials"],
});

app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("home", {
        name: "Name",
        surname: "Surname",
        works: [
            {
                jobName: "IT Recruter at Microsoft",
                jobDate: "05.05.2022 - 01.01.2023",
            },
            {
                jobName: "Full-Stack Developer at Microsoft",
                jobDate: "24.05.2023 - now",
            },
        ],
        layout: false,
    });
});

app.listen(PORT);

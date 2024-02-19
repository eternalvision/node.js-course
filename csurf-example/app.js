const express = require("express");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: true });

const app = express();
app.use(cookieParser());

app.get("/form", csrfProtection, (req, res) => {
    res.send(`
        <form action="/process" method="POST">
            <input type="hidden" name="_csrf" value="${req.csrfToken()}"/>
            <button type="submit">Send</button>
        </form>
    `);
});

app.post("/process", parseForm, csrfProtection, (req, res) => {
    res.send("Form process...");
});

app.listen(3101);

const express = require("express");
const session = require("express-session");
require("dotenv").config();

const app = express();

const { SECRET_KEY, PORT } = process.env;

app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

app.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`<p>Количество просмотров: ${req.session.views}</p>`);
    } else {
        req.session.views = 1;
        res.send(
            `Добро пожаловать на главную страницу! Перезагрузите страницу`,
        );
    }
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

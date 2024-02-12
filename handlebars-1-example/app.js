const express = require("express");
const { engine } = require("express-handlebars");

const PORT = 3101;

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views/layouts");

app.get("/", (req, res) => {
    res.render("home", {
        name: "World",
        isAdmin: true,
        items: ["Pinaple", "Apple", "Lemon"],
        user: {
            name: "Ivan",
            age: 30,
        },
        layout: false,
    });
});

app.listen(PORT);

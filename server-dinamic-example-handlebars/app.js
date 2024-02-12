const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");

const app = express();
const PORT = 3101;

app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views/layouts");

const readData = () => {
    const data = fs.readFileSync("./data.json", "utf-8");
    return JSON.parse(data);
};

app.post("/todos", (req, res) => {
    const newTodo = req.body;
    const data = readData();
    data.todos.push(newTodo);
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    res.status(201).send("Задача добавлена");
});

app.get("/", (req, res) => {
    const data = readData();
    res.render("home", data);
});

app.listen(PORT, () => {
    console.log("Server started at http://localhost:3101");
});

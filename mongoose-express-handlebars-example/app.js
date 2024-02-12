require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { engine } = require("express-handlebars");
const User = require("./models/User");

const { LOGIN, PASSWORD } = process.env;
const PORT = 3101;

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views/layouts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
    .connect(
        `mongodb+srv://${LOGIN}:${PASSWORD}@nodemongowork.rpr3zez.mongodb.net/`,
    )
    .then(() => console.log("Connected to Database successful "))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.redirect("/users");
});

app.get("/users", async (req, res) => {
    const users = await User.find({}).lean().exec();
    console.log(users);
    res.render("users", { users, layout: false });
});

app.post("/users", async (req, res) => {
    const { name, email, age } = req.body;
    await User.create({ name, email, age });
    res.redirect("/users");
});

app.post("/users/update", async (req, res) => {
    const { id, name, email, age } = req.body;
    await User.findByIdAndUpdate(id, { name, email, age });
    res.redirect("/users");
});

app.post("/users/delete", async (req, res) => {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
});

app.listen(PORT);

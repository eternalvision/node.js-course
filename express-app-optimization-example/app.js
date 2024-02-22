const express = require("express");
const app = express();
const PORT = 3101;
const { postRouter, userRouter } = require("./controllers");

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT);

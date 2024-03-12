const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./server/server");

const {
    userRouter,
    projectRouter,
    userProjectRouter,
} = require("./controllers");

// winston => .log | error.log
// pino => info("controller user:")

const app = express();

app.use(express.json());
app.use(morgan("dev")); //development

app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/user-project", userProjectRouter);

app.listen(3101, () => {
    console.log(`http://localhost:3101`);
});

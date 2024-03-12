const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./server/server");

const helpers = require("./helpers");

const { authenticatedToken } = helpers;

const authRouterInstance = express.Router(),
    projectRouterInstance = express.Router(),
    userProjectRouterInstance = express.Router();

const {
    ProjectRouter,
    userProjectRouter,
    AuthRouter,
} = require("./controllers");

// winston => .log | error.log
// pino => info("controller user:")
AuthRouter(authRouterInstance, helpers);
ProjectRouter(projectRouterInstance, helpers);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); //development

app.use("/api/project", authenticatedToken, projectRouterInstance);
app.use("/api/user-project", authenticatedToken, userProjectRouterInstance);
app.use("/api/auth", authRouterInstance);

// {
// "newPassword":"320260SaLiT",
// "oldPassword":"310180SaLiT"
// }

// app.listen(3101);
const PORT = process.env.PORT || 3101;
app.listen(PORT);

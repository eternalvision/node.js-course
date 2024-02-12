const express = require("express");
const cors = require("cors");
const { taskRouter } = require("./routes/api/taskRouter");

const PORT = 3101;
const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

taskRouter(router);

app.use("/api/tasks", router);

app.listen(PORT);

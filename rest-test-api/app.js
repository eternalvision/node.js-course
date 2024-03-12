const express = require("express");
const userControllers = require("./controllers/userControllers");
const app = express();
const port = 3101;

app.use(express.json());

app.use("/api/users", userControllers);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

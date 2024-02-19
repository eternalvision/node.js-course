require("dotenv").config();
require("./config/db")();

const express = require("express");
const app = express();

const Account = require("./models/Account");
const RegisterValidation = require("./models/RegisterValidation");
const Controllers = require("./controllers/AccountControllers");

const { PORT } = process.env;

app.use(express.json());

Controllers(app, Account, RegisterValidation);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

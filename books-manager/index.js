const express = require("express");
const cors = require("cors");

const booksRouter = require("./routes/api/booksRouter");
const books = require("./data/books");

const PORT = 3101;

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

booksRouter(router, books);

app.use("/api/books", router);

app.listen(PORT);

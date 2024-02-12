const express = require("express");

const PORT = 3101;

const app = express();

app.use(express.json()); //global midlleware

const mass = [
    {
        id: 1,
        name: "Ivan",
        age: 30,
    },
    {
        id: 2,
        name: "Anton",
        age: 25,
    },
];

app.get("/users", (req, res) => {
    res.send(JSON.stringify(mass));
});

app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(req.params);

    const user = mass.find((user) => user.id === userId);
    if (user) {
        res.send(`Имя пользователя с таким id: ${user.name}`);
    } else {
        res.status(400).send("Пользователя с таким id не существует");
    }
});

app.put("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const { name } = req.body;
    const userIndex = mass.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        mass[userIndex].name = name;
        res.json(mass[userIndex]);
    } else {
        res.status(400).send("Пользователя с таким id не существует");
    }
});

app.delete("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const userIndex = mass.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        mass.splice(userIndex, 1);
        res.send("Пользователь удален");
    } else {
        res.status(404).send("Пользователь не найден");
    }
});

const books = [
    {
        id: 1,
        isbn: "978-3-16-148410-0",
        title: "War and Peace",
        author: "Leo Tolstoy",
        genre: "Fiction",
    },
    {
        id: 2,
        isbn: "978-2-10-141110-5",
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        genre: "Fiction",
    },
    {
        id: 3,
        isbn: "118-0-10-177120-5",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
    },
    {
        id: 4,
        isbn: "522-7-12-177090-8",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
    },
    {
        id: 5,
        isbn: "512-7-14-172290-6",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
    },
];

app.get("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books.find((book) => book.isbn === isbn);

    if (book) {
        // res.send(JSON.stringify(book));
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost${PORT}`);
});

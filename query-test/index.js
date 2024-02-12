const express = require("express");

const PORT = 3101;

const app = express();

app.use(express.json()); //global midlleware

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

app.get("/books", (req, res) => {
    const { genre, author } = req.query;
    let filteredBooks = books;

    if (genre) {
        filteredBooks = filteredBooks.filter(
            (book) => book.genre.toLowerCase() == genre.toLowerCase(),
        );
    }

    if (author) {
        filteredBooks = filteredBooks.filter(
            (book) => book.author.toLowerCase() == author.toLowerCase(),
        );
    }

    res.json(filteredBooks);
});

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Bob" },
    { id: 5, name: "Eve" },
    { id: 6, name: "Michael" },
    { id: 7, name: "Emily" },
    { id: 8, name: "David" },
    { id: 9, name: "Sophia" },
    { id: 10, name: "William" },
    { id: 11, name: "Olivia" },
    { id: 12, name: "James" },
    { id: 13, name: "Emma" },
    { id: 14, name: "Benjamin" },
    { id: 15, name: "Ava" },
    { id: 16, name: "Mason" },
    { id: 17, name: "Charlotte" },
    { id: 18, name: "Daniel" },
    { id: 19, name: "Amelia" },
    { id: 20, name: "Liam" },
];

app.get("/users", (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json(paginatedUsers);
});

const products = [
    { id: 1, name: "Iphone 14 Pro", price: "25000", category: "Electronic" },
    { id: 2, name: "Google Pixel", price: "20000", category: "Electronic" },
    { id: 3, name: "Okulus Rift", price: "15000", category: "Gadjet" },
    { id: 4, name: "Hoodie RS", price: "2500", category: "Cloth" },
];

app.get("/products", (req, res) => {
    const { sortBy, order } = req.query;
    let sortedProducts = [...products];

    if (sortBy) {
        sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a[sortBy]);
            const priceB = parseFloat(b[sortBy]);

            if (order === "decrease") {
                return priceB - priceA;
            } else if (order === "increase") {
                return priceA - priceB;
            }
        });
    }

    res.json(sortedProducts);
});

const orders = [
    {
        id: 1,
        date: "2023-01-15",
        total: 150,
        status: "completed",
    },
    {
        id: 2,
        date: "2023-02-20",
        total: 200,
        status: "completed",
    },
    {
        id: 3,
        date: "2023-03-10",
        total: 100,
        status: "pending",
    },
    {
        id: 4,
        date: "2023-04-05",
        total: 250,
        status: "completed",
    },
    {
        id: 5,
        date: "2023-06-15",
        total: 180,
        status: "completed",
    },
    {
        id: 6,
        date: "2023-08-25",
        total: 300,
        status: "completed",
    },
    {
        id: 7,
        date: "2023-10-01",
        total: 210,
        status: "pending",
    },
    {
        id: 8,
        date: "2023-12-20",
        total: 220,
        status: "completed",
    },
];

app.get("/orders", (req, res) => {
    const { startDate, endDate } = req.query;

    let filteredOrders = [...orders];

    if (startDate && endDate) {
        filteredOrders = filteredOrders.filter((order) => {
            const orderDate = new Date(order.date);
            return (
                orderDate >= new Date(startDate) &&
                orderDate <= new Date(endDate)
            );
        });
    }

    res.json(filteredOrders);
});

const workers = [
    { id: 1, name: "John", age: 30, job: "Developer", salary: 50000 },
    { id: 2, name: "Alice", age: 25, job: "Designer", salary: 60000 },
    { id: 3, name: "Bob", age: 35, job: "Manager", salary: 70000 },
    { id: 4, name: "Bob", age: 35, job: "3D Designer", salary: 60000 },
];

app.get("/workers", (req, res) => {
    const { age, name, job, salary } = req.query;

    let filteredWorkers = [...workers];

    if (age) {
        filteredWorkers = filteredWorkers.filter((worker) => {
            return worker.age === parseInt(age);
        });
    }

    if (name) {
        filteredWorkers = filteredWorkers.filter((worker) => {
            return worker.name.toLowerCase().includes(name.toLowerCase());
        });
    }

    if (job) {
        filteredWorkers = filteredWorkers.filter((worker) => {
            return worker.job.toLowerCase().includes(job.toLowerCase());
        });
    }

    if (salary) {
        filteredWorkers = filteredWorkers.filter((worker) => {
            return worker.salary === parseInt(salary);
        });
    }

    res.json(filteredWorkers);
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost${PORT}`);
});

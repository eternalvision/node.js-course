const express = require("express");

const PORT = 3101;

const app = express();

app.use(express.json()); //global midlleware

// <form></form>
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/", (req, res) => {
    res.send(`
        <form action="/json" method="POST">
            <label for="name">Name: </label>
            <input type="text" id="name" name="name"/>
                <br/>
                <br/>
            <label for="age">Age: </label>
            <input type="text" id="age" name="age"/>
                <br/>
                <br/>
            <button type="submit">Submit</button>
        </form>
        `);
});

app.post("/submit", (req, res) => {
    const { name, age } = req.body;
    users.push({ name, age });
    console.log(users);
    res.send(`
        <h1>Данные успешно отправленны из формы</h1>
        <ul>
            <li>Name: ${users[0].name}</li>
            <li>Age: ${users[0].age}</li>
        </ul>
    `);
});

app.post("/json", (req, res) => {
    const { name, age } = req.body;
    users.push({ name, age });
    res.send({ message: "Данные отправленны в формате JSON", users });
});

let userData = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 35 },
];

app.post("/users", (req, res) => {
    const { name, age } = req.body;
    const newUser = { id: userData.length + 1, name, age };
    userData.push(newUser);
    res.json(newUser);
});

app.get("/users", (req, res) => {
    res.json(userData);
});

app.get("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = userData.find((data) => data.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "Пользователь не найден" });
    }
});

app.put("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const { name, age } = req.body;
    const index = userData.findIndex((data) => data.id === userId);
    if (index !== -1) {
        userData[index] = { ...userData[index], name, age };
        res.json(userData[index]);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.delete("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const index = userData.findIndex((data) => data.id === userId);
    if (index !== -1) {
        userData.splice(index, 1);
        res.json({ message: "User deleted" });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost${PORT}`);
});

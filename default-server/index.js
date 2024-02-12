const express = require("express");
const app = express();

const port = 3101;

app.get("/", (request, response) => {
    // res.send("Hello world!");
    response.send(`<h2 style="color:red;">Home page</h2>`);
});

app.get("/contacts", (request, response) => {
    // res.send("Hello world!");
    console.log(request.url);
    console.log(request.method);

    response.send(`<h2>Contacts page</h2>`);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

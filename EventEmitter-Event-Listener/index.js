const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello world!");
});

server.on("connection", () => {
    console.log("Новое соединение");
});

server.on("request", (req, res) => {
    console.log(`Запрос: ${req.url}`);
});

server.listen(3101, () => {
    console.log(`Server started at http://localhost:3101`);
});

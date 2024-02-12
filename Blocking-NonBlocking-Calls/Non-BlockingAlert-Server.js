const http = require("http");
const fs = require("fs");
const PORT = 3101;

const server = http.createServer((req, res) => {
    console.log("Получен запрос");

    fs.readFile("./nonblocktest.json", "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Ошибка при чтении файла");
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log("Получен запрос");

    const data = fs.readFileSync("blocktest.txt", "utf-8");

    console.log("Текст прочитан");

    res.writeHead(200, { "Content-type": "text/plain" });
    res.end(data);
});

const PORT = 3101;

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

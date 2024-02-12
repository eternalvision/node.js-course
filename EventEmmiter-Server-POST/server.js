const http = require("http");
const emitter = require("./eventEmitter");
require("./eventHandlers");

const PORT = 3101;

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/send") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            emitter.emit("requestData", body);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Данные отправленны на обработку");
        });
    } else {
        res.writeHead(404);
        res.end("Не найдено");
    }
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

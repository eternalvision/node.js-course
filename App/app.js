const http = require("http");
const { handlerRequest } = require("./requestHandler");

const PORT = 3101;

const server = http.createServer(handlerRequest);

server.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

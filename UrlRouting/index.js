const http = require("http");
const url = require("url");
const { Handlers } = require("./Handlers");

const { api, notFound } = Handlers;

const PORT = 3101;

const server = http.createServer((req, res) => {
    // req.url => http://localhost:3101/api/data
    const parsedUrl = url.parse(req.url, true); //true - аргумент который укзывает библиотеке url парсить путь
    const path = parsedUrl.pathname; // выдераем путь URL из объекта хранилища пути
    const trimmedPath = path.replace(/^\/+|\/+$/g, ""); //удаляем слэши (/\) в начале и конце пути url

    switch (trimmedPath) {
        case "api/data":
            api(req, res);
            break;
        default:
            notFound(req, res);
    }
});

server.listen(PORT, () => {
    console.log("Server started at http://localhost:3101");
});

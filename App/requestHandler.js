const fs = require("fs");
const url = require("url");

// readFile
// writeFile

const handlerRequest = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");

    switch (trimmedPath) {
        case "readFile":
            readFileHandler(res);
            break;
        case "writeFile":
            writeFileHandler(req, res);
            break;
        default:
            notFoundHandler(res);
    }
};

const readFileHandler = (res) => {
    fs.readFile("./example.txt", "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Не удалось прочитать файл");
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
};

const writeFileHandler = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        fs.writeFile("./example.txt", body, (err) => {
            if (err) {
                res.writeHead(500);
                res.end("Не удалось записать файл");
            } else {
                res.writeHead(200);
                res.end("Файл успешно записан");
            }
        });
    });
};

const notFoundHandler = (res) => {
    res.writeHead(404);
    res.end("Страница не найдена");
};

module.exports = { handlerRequest };

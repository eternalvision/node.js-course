const http = require("http");
const url = require("url");

const { mongoose } = require("./server");

const Cat = require("./models");
const { Add, Get, Update } = require("./controllers");
const ResponseHandler = require("./helpers");

const PORT = 3101;

mongoose.connection;

const server = http.createServer(async (req, res) => {
    const METHOD = req.method;
    const reqUrl = url.parse(req.url, true);
    const pathname = reqUrl.pathname;
    const path = pathname.split("/")[1] || null;

    let body = "";

    const { query } = reqUrl;
    const { id } = query;

    if (METHOD === "POST" || METHOD === "PUT") {
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
    }

    if (path === "add" && METHOD === "POST") {
        req.on("end", async () => {
            const data = JSON.parse(body);
            await Add(Cat, data, ResponseHandler, res);
        });
    } else if (path === "get" && METHOD === "GET") {
        await Get(Cat, ResponseHandler, res);
    } else if (path === "update" && METHOD === "PUT") {
        req.on("end", async () => {
            const data = JSON.parse(body);
            await Update(Cat, data, ResponseHandler, res, id);
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

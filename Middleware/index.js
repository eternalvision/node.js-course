const http = require("http");
const fs = require("fs").promises; //async file system library in node.js
const uuid = require("uuid"); //generate id

const getAllLogs = async () => {
    try {
        const data = await fs.readFile("./logs.json", "utf-8"); //stringify default returning
        return JSON.parse(data);
    } catch (error) {
        throw new Error(error);
    }
};

const GetLogData = (time, url, method) => {
    return {
        id: uuid.v1(),
        time: time,
        url: url,
        method: method,
    };
};

const ReWriteLogs = async (logs) => {
    try {
        await fs.writeFile("./logs.json", JSON.stringify(logs, null, 4));
    } catch (error) {
        throw new Error(error);
    }
};

const logRequest = async (req, res, next) => {
    const time = new Date().toISOString();
    const logs = await getAllLogs();

    logs.push(GetLogData(time, req.url, req.method));

    await ReWriteLogs(logs);
    console.log(`${time} - ${req.method} ${req.url}`);
    next();
};

const GetUrl = (req, res, next) => {
    console.log(req.url);
    next();
};

const applyMiddleware = (middleware, serverHandler) => {
    return (req, res) => {
        let i = 0;
        const next = () => {
            const func = middleware[i] || serverHandler;
            i++;
            func(req, res, next);
        };
        next();
    };
};

const serverHandler = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello!");
};

const server = http.createServer(
    applyMiddleware([logRequest, GetUrl], serverHandler),
);

server.listen(3101, () => {
    console.log("Server started at http://localhost:3101");
});

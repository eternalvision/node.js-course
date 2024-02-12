const http = require("http");
const url = require("url");

const db = require("./server");
const Routes = require("./routes");
const ResponseHandler = require("./helpers");

const PORT = 3101;

const { GetUsers, GetWorkerData } = Routes;

const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const queryObject = url.parse(req.url, true).query;
    console.log(reqUrl);
    const { pathname } = reqUrl;
    const { method } = req;

    switch (pathname) {
        case "/people":
            if (method === "GET") {
                const data = await GetUsers(db);
                ResponseHandler(
                    res,
                    "application/json",
                    200,
                    JSON.stringify(data),
                );
            }
            break;
        case "/workers":
            if (method === "GET") {
                const { salary, department } = queryObject;
                const data = await GetWorkerData(salary, department, db);
                ResponseHandler(
                    res,
                    "application/json",
                    200,
                    JSON.stringify(data),
                );
            }
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Server started ar http://localhost:${PORT}`);
});

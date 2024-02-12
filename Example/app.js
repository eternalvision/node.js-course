const pool = require("./server/server");
const http = require("http");
const url = require("url");
const Employee = require("./employees");

const { Create, Update, Delete, Get } = Employee;

const PORT = 3101;

// http://localhsot:3101
// axios

const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const pathname = reqUrl.pathname;
    const method = req.method; // POST / GET / DELETE / PUT

    const id = pathname.split("/").reverse()[0] || null;
    const path = pathname.split("/")[1] || null;
    let parsedData = "";
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", async () => {
        try {
            if (path === "add" || path === "update") {
                parsedData = JSON.parse(body || {});
            }

            switch (path) {
                case "get":
                    if (method === "GET") {
                        await Get(pool, res);
                    }
                    break;
                case "add":
                    if (method === "POST") {
                        await Create(
                            parsedData.username,
                            parsedData.email,
                            res,
                            pool,
                        );
                    }
                    break;
                case "update":
                    if (method === "PUT") {
                        await Update(
                            id,
                            parsedData.username,
                            parsedData.email,
                            pool,
                            res,
                        );
                    }
                    break;
                case "delete":
                    if (method === "DELETE") {
                        await Delete(id, pool, res);
                    }
                    break;
                default:
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Request Error");
            }
        } catch (error) {
            res.writeHead(500);
            res.end(error.message);
        }
    });

    // pool.end();
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhsot:${PORT}`);
});

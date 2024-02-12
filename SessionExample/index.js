const http = require("http");
const url = require("url");
const querystring = require("querystring"); //JSON.parse / JSON.stringify
const NodeSession = require("node-session");

const PORT = 3101;

const session = new NodeSession({ secret: "odsfjimgosj958349" });

const server = http.createServer((req, res) => {
    session.startSession(req, res, () => {
        const pathname = url.parse(req.url).pathname;

        if (pathname === "/login") {
            handleLogin(req, res);
        } else if (pathname === "/dashboard") {
            handleDashboard(req, res);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Page Not-Found");
        }
    });
});

const handleLogin = (req, res) => {
    if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const { username, password } = querystring.parse(body);

            if (username === "user" && password === "password") {
                req.session.put("user", username);
                res.writeHead(302, { Location: "/dashboard" });
                res.end();
            } else {
                res.writeHead(401);
                res.end("Error in username or pass");
            }
        });
    } else {
        res.writeHead(405);
        res.end("Method not allowed");
    }
};

const handleDashboard = (req, res) => {
    if (req.session.has("user")) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Dashboard <br /> <p>Доступ разрешен</p></h1>");
    } else {
        res.writeHead(302, { Location: "/login" });
        res.end();
    }
};

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

const http = require("http");

const PORT = 3101;

const GetList = (jsonData) => {
    return `<ul>
    ${jsonData
        .map(({ name, age }) => {
            return `<li>${name}; ${age}</li>`;
        })
        .join("")}
    </ul>`;
};

const GetResponse = (res, code, contentType, text, jsonData) => {
    res.writeHead(code, { "Content-Type": contentType });
    if (contentType === "text/html") {
        res.end(GetList(jsonData));
    } else {
        res.end(text ? text : JSON.stringify(jsonData));
    }
};

const server = http.createServer((req, res) => {
    const { method, url } = req;
    //! 1
    // url.split("/").map((path) => {
    //     switch (path) {
    //         case "home":
    //             res.writeHead(200, { "Content-Type": "text/plain" });
    //             res.end("Welcome to home");
    //             break;
    //     }
    // });
    //! 2
    // if (method === "GET") {
    //     console.log(`GET запрос на ${url}`);
    // } else if (method === "POST" || method === "PUT") {
    //     let body = "";
    //     req.on("data", (chunk) => {
    //         body += chunk.toString();
    //     });
    //     req.on("end", () => {
    //         let ParsedData = JSON.parse(body);
    //         console.log(ParsedData.login);
    //         console.log(ParsedData.password);
    //         console.log(ParsedData.age);
    //     });
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.end("");
    // }
    //! 3
    if (method === "GET") {
        if (url === "/api/data") {
            const jsonData = { message: "This is GET JSON-response" };
            GetResponse(res, 200, "application/json", null, jsonData);
        } else {
            const text = "Page with method GET Not Found";
            GetResponse(res, 404, "text/plain", text, null);
        }
    } else if (method === "POST") {
        if (url === "/api/create") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                console.log("You Data: ");
                console.log(JSON.parse(body));

                const jsonData = {
                    message: "Data saved succsessfuly",
                };
                GetResponse(res, 200, "application/json", null, jsonData);
            });
        } else if (url === "/api/home") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                const jsonData = JSON.parse(body);
                GetResponse(res, 200, "text/html", null, jsonData);
            });
        } else {
            const text = "Page with metod POST Not Found";
            GetResponse(res, 404, "text/plain", text, null);
        }
    } else if (method === "DELETE") {
        if (url === "/delete") {
            console.log("Request to delete data");

            const jsonData = {
                message: "Data deleted",
            };
            GetResponse(res, 200, "application/json", null, jsonData);
        } else {
            const text = "Page with metod DELETE Not Found";
            GetResponse(res, 404, "text/plain", text, null);
        }
    } else {
        const text = "Method not allowed";
        GetResponse(res, 405, "text/plain", text, null);
    }
});

server.listen(PORT, () => {
    console.log("Server start at http://localhost:3101");
});

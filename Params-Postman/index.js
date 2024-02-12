import http from "http";
import url from "url";

import { Modules } from "./modules/index.js";

const { Hi } = Modules;

const PORT = 3101;

const resTypes = (res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
};

const server = http.createServer((req, res) => {
    try {
        const { pathname, query } = url.parse(req.url, true);

        resTypes(res);

        if (pathname === "/home") {
            Hi(res, query);
        } else {
            res.end("Hi");
        }
    } catch (error) {
        throw new Error();
    }
});

server.listen(PORT, () => {
    console.log(`Server started at port http://localhost:${PORT}`);
});

//! http://localhost:3101/about?name=Stephan
//! /about?name=Stephan

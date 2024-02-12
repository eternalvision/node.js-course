import http from "http";
import { Modules } from "./modules/index.js";

const { authenticate, dateModules, log } = Modules;

const PORT = 3101;

const resTypes = (res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
};

const server = http.createServer((req, res) => {
    try {
        const { url } = req;
        switch (url) {
            case "/date":
                resTypes(res);
                res.end(dateModules());
                break;
            case "/adminpanel":
                resTypes(res);
                const authResult = authenticate("user");
                if (authResult) {
                    res.end("Hello admin!");
                } else {
                    res.statusCode = 403;
                    res.end("Нет доступа!");
                }
                break;
            case "/log":
                resTypes(res);
                res.end(log("OK"));
                break;
            default:
                resTypes(res);
                res.end("Hello world!");
        }
    } catch (error) {
        throw new Error(error);
    }
});

server.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

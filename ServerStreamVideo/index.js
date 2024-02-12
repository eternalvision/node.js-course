const http = require("http");
const fs = require("fs");
const PORT = 3101;

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/video") {
        res.setHeader("Content-Type", "video/mp4");
        const stream = fs.createReadStream("video.mp4");
        stream.pipe(res);
    } else {
        res.end("Hello world!");
    }
});

server.listen(PORT);

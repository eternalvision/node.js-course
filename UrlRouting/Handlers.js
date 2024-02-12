let Handlers = {
    api: (req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ message: "Data from APi" }));
    },
    notFound: (req, res) => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Страница не найдена");
    },
};

module.exports = {
    Handlers,
};

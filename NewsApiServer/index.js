const http = require("http");
const axios = require("axios");
const url = require("url");

const PORT = 3101;
const newsUrl = `https://newsapi.org/v2/everything`;
const ApiKey = "cb2c7d31c1484d68a5d476f3f16a7e3e";

const CreateResponse = (res, code, contentType, data) => {
    res.writeHead(code, { "Content-Type": contentType });
    res.end(data);
};

const server = http.createServer(async (req, res) => {
    const queryObject = url.parse(req.url, true).query;

    const { from, to, language, q } = queryObject;

    try {
        const response = await axios.get(newsUrl, {
            params: {
                from: from || "2024-01-01",
                language: language || "en",
                q: q || "example",
                to: to || "2024-01-10",
                apiKey: ApiKey,
            },
        });

        CreateResponse(
            res,
            200,
            "application/json",
            JSON.stringify(response.data),
        );
    } catch (error) {
        CreateResponse(res, 500, "text/plain", error);
    }
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

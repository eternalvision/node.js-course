const https = require("https");
const ApiKey = "cb2c7d31c1484d68a5d476f3f16a7e3e";

const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${ApiKey}`;

https
    .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            if (response.statusCode === 200) {
                try {
                    const newsData = JSON.parse(data);
                    console.log(newsData);
                } catch (error) {
                    console.error(error);
                    throw new Error(error);
                }
            }
        });
    })
    .on("error", (error) => {
        console.error(newsData);
        throw new Error(error);
    });

const http = require("http"); //start server
const https = require("https"); //sending request
const url = require("url");
const PORT = 3101;

const ApiKey = "eb6f515b6a5d0c301c2cd889fff76e76";

const CreateResponse = (res, code, contentType, data) => {
    res.writeHead(code, { "Content-Type": contentType });
    res.end(data);
};

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const city = queryObject.city;

    if (!city) {
        CreateResponse(res, 400, "text/plain", "Не указан город");
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;

    https
        .get(weatherUrl, (weatherResponse) => {
            let data = "";

            weatherResponse.on("data", (chunk) => {
                data += chunk;
            });

            weatherResponse.on("end", () => {
                if (weatherResponse.statusCode === 200) {
                    try {
                        const weatherData = JSON.parse(data);
                        const {
                            main: { temp },
                            wind: { speed },
                        } = weatherData;

                        const newData = {
                            temperature: `${temp} Градусов`,
                            clouds: `Тип облаков: ${weatherData.weather.map(
                                ({ main }) => main,
                            )}`,
                            windSpeed: `Скорость ветра ${speed} км/ч`,
                        };

                        CreateResponse(
                            res,
                            200,
                            "application/json",
                            JSON.stringify(newData),
                        );
                    } catch (error) {
                        CreateResponse(
                            res,
                            500,
                            "text/plain",
                            `Ошибка при обработке запроса ${error}`,
                        );
                    }
                }
            });
        })
        .on("error", (error) => {
            CreateResponse(
                res,
                500,
                "text/plain",
                `Ошибка при обработке запроса ${error}`,
            );
        });
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

// cb2c7d31c1484d68a5d476f3f16a7e3e

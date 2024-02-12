const https = require("https");

const ApiKey = "eb6f515b6a5d0c301c2cd889fff76e76";
const City = "Praha";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${ApiKey}&units=metric`;

https
    .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            if (response.statusCode === 200) {
                try {
                    const weatherData = JSON.parse(data);
                    console.log(weatherData);
                } catch (error) {
                    console.error(`Ошибка при парсинге: ${error}`);
                }
            } else {
                console.error(
                    `Ошибка, сервер вернул статус ${response.statusCode}`,
                );
            }
        });
    })
    .on("error", (error) => {
        throw new Error(error);
    });

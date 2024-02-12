const fs = require("fs");

const readStream = fs.createReadStream("./example.txt");

readStream.on("data", (chunk) => {
    console.log(`Получен кусок данных: ${chunk}`);
});

readStream.on("end", () => {
    console.log("Чтение завершено");
});

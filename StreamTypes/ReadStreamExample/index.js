const fs = require("fs");

let readStream = fs.createReadStream("./bigfile.txt");

readStream.on("data", (chunk) => {
    console.log(chunk);
});

readStream.on("end", () => {
    console.log("Чтение файла завершено");
});

readStream.on("error", (error) => {
    console.error(`Ошибка при чтении файла: ${error}`);
});

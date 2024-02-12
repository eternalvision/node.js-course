const fs = require("fs");

// try {
//     const OpenFile = fs.openSync("./file.txt", "r"); // read
//     console.log(`Файл открыт для чтения: ${OpenFile}`);

//     const bufferSize = 2048;
//     const buffer = Buffer.alloc(bufferSize);
//     let bytesRead;

//     bytesRead = fs.readSync(OpenFile, buffer, 0, bufferSize, 15);
// fd - Файловый дескриптор
// buffer - память/контейнер
// offset - 10 - 11
// buffer length - сколько слов может поместиться в ячейку памяти
// position - начало чтения файла

// console.log(buffer.toString("utf-8", 0, bytesRead));

//     fs.closeSync(OpenFile);
// } catch (error) {
//     throw new Error(error);
// }

// const readStream = fs.createReadStream("./file.txt", "utf-8");

// readStream.on("data", (chunk) => {
//     console.log("получена часть данных: " + chunk);
// });

// readStream.on("end", () => {
//     console.log("Чтение завершено");
// });

// readStream.on("error", (err) => {
//     console.error(err);
// });

try {
    const fd = fs.openSync("./file2.txt", "w"); // write
    const data = "This is Example Text";
    fs.writeSync(fd, data);
    fs.closeSync(fd);
} catch (error) {
    throw new Error(error);
}

const fs = require("fs");

console.log("Начало чтения файла");

const data = fs.readFileSync("./blocktest.txt", "utf8");
console.log(data);

console.log("Конец чтения файла");

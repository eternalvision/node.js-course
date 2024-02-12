const path = require("path");
const fs = require("fs");
const data = require("./getData");

require("dotenv").config();

//! dirname/filename

console.time("Метка времени"); //start time

console.log(`Путь к текущему файлу: ${__filename}`);

console.log(`Путь к текущей папке: ${__dirname}`);

const configPath = path.join(__dirname, "config.json");

console.log(`Путь к файлу конфигурации: ${configPath}`);

fs.readFile(configPath, "utf-8", (err, data) => {
    if (err) throw new Error(err);
    const JSONData = JSON.parse(data);

    console.log(JSONData.isChatStatus);
    console.log(JSONData.webHost);
});

//! console

console.log("Лог");

console.error("Error!");

// throw new Error("Error!");

console.warn("Alert! This is bad status!");

console.table({ name: "Artem", age: 30 });

console.timeEnd("Метка времени"); //end time

//! process
const argv = process.argv;
console.log(argv);

const envVar = process.env.MY_ENV_API_TOKEN;
const num = process.env.NUM;
console.log(envVar);
console.log(num);

console.log(`PID: ${process.pid}`);
console.log(`Platform: ${process.platform}`);
console.log(`Title: ${process.title}`);

process.on("exit", () => {
    console.log("Процесс завершается...");
});

// console.log(process.stdout);
// console.log(process.stdin);
// console.log(process.stderr);

// process.stdout.write("Привет мир\n");

// bom
// v8 engine - js движок console.log
// node engine - node.js движок - stdout

global.foo = 3;

global.SumNumbers = (a, b) => {
    console.log(a + b);
};

data.useGlobalVariable();

data.GetSumResult();

const buffer = Buffer.from("Привет мир", "utf-8"); // 38
console.log(buffer.toString());

// setTimeout, setInterval
// clearTimeout, clearInterval

const timerId = setTimeout(() => {
    console.log("Hi");
}, 3000);

setTimeout(() => {
    clearTimeout(timerId);
}, 1500);

let i = 0;
const IteratorInterval = setInterval(() => {
    i++;
    console.log(i);
}, 500);

setTimeout(() => {
    clearInterval(IteratorInterval);
}, 2000);

// event loop <- {f sum (a b) a+b console num/3 return } setImmediate() setTimout(500 a) a }

console.log("Перед setImmediate");

setImmediate(() => {
    console.log("Выполнено в setImmediate");
});

console.log("После setImmediate");

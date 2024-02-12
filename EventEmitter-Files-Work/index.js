const fs = require("fs");
const EventEmitter = require("events");

const emitter = new EventEmitter();

const readFile = (path) => {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            emitter.emit("error", err);
            return;
        }
        emitter.emit("read", data);
    });
};

emitter.on("read", (data) => {
    console.log("Данные файла:", data);
});

emitter.on("error", (err) => {
    throw new Error(err);
});

readFile("./example.txt");

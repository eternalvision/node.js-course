const fs = require("fs");
const { Transform, Duplex } = require("stream");

const bytesToMegabytes = (bytes) => {
    return bytes / 1024 / 1024;
};

let readStream = fs.createReadStream("./bigfile.txt");

readStream.on("data", (chunk) => {
    console.log(
        `Получена часть данных: ${bytesToMegabytes(chunk.length)} мегабайт`,
    );
    console.log(chunk);
});

let writeStream = fs.createWriteStream("./output.txt");
// writeStream.write("Привет, мир!");
// writeStream.end();

let upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

readStream.pipe(upperCaseTr).pipe(writeStream);

let chatStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(`Сообщение: ${chunk.toString()}`);
        callback();
    },
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    },
});

chatStream.currentCharCode = 65;
chatStream.pipe(chatStream);

const fs = require("fs");

const readStream = fs.createReadStream("largefilte.txt");
const writeStream = fs.createWriteStream("filtered.txt");

readStream.on("data", (chunk) => {
    const transformedChunk = chunk.toString().replace(/ /g, "#");
    writeStream.write(transformedChunk);
});

readStream.on("end", () => {
    console.log("Чтение и запись закончились");
    writeStream.end();
});

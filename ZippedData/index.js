const zlib = require("zlib");
const fs = require("fs");

let compressStream = zlib.createGzip();
let readStream = fs.createReadStream("example.txt");
let writeStream = fs.createWriteStream("Example.txt.gz");

readStream.pipe(compressStream).pipe(writeStream);

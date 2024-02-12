const fs = require("fs");

// fs.open("./file.txt", "r", (err, fd) => {
//     if (err) {
//         throw new Error(err);
//     }

//     const bufferSize = 1024;
//     const buffer = Buffer.alloc(bufferSize);

//     fs.read(fd, buffer, 0, bufferSize, 0, (err, bytesRead, buffer) => {
//         if (err) {
//             throw new Error(err);
//         }
//         console.log(buffer.toString("utf-8", 0, bytesRead));
//     });

//     console.log("Файл открыт, дескриптор файла: " + fd);

//     fs.close(fd, (err) => {
//         if (err) throw new Error(err);
//     });
// });

fs.open("./file2.txt", "w", (err, fd) => {
    if (err) throw new Error(err);
    const data = "This is async example text for write";

    fs.write(fd, data, (err) => {
        if (err) throw new Error(err);
        console.log("Success");

        fs.close(fd, (err) => {
            if (err) throw new Error(err);
        });
    });
});

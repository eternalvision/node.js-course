// const fs = require("fs");
// try {
//     fs.readFile("./file.txt", "utf-8", (err, data) => {
//         if (err) throw new Error(err);
//         console.log(data);
//     });
// } catch (error) {
//     throw new Error(err);
// }

// const fs = require("fs").promises;
// const AsyncDataGet = async () => {
//     try {
//         return await fs.readFile("./file.txt", "utf-8");
//     } catch (error) {
//         throw new Error(err);
//     }
// };
// AsyncDataGet().then((data) => console.log(data));

const fs = require("fs");

try {
    fs.writeFile("./file2.txt", "Text", (err, data) => {
        if (err) throw new Error(err);
        console.log("Файл записан");
    });
} catch (error) {
    throw new Error(error);
}

const fs = require("fs");

const writeStream = fs.createWriteStream("./ex.txt");

const data = [
    {
        id: "padjfopajdfopj394u93",
        name: "Ivan",
        surname: "Ivanov",
    },
    {
        id: "lsdngblnb980808",
        name: "Vlad",
        surname: "Ivanov",
    },
    {
        id: "cxjnolbhxoi9485948594",
        name: "Irina",
        surname: "Ivanova",
    },
];

data.map(({ id, name, surname }) => {
    writeStream.write(`${id} ${name} ${surname}\n`);
});

writeStream.end("End\n");

writeStream.on("finish", () => {
    console.log("Текст записан");
});

writeStream.on("error", (err) => {
    throw new Error(err);
});

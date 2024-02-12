const fs = require("fs");

let writeStream = fs.createWriteStream("output.json");

const data = [
    {
        userType: "admin",
        id: "dpjfodjrf8934739489shfk",
        userName: "AdminIsHere",
    },
    {
        userType: "user",
        id: "jdofjodhjf8375903785uj",
        userName: "vasya228",
    },
];

writeStream.write(JSON.stringify(data));
writeStream.end();

writeStream.on("finish", () => {
    fs.readFile("output.json", (error, data) => {
        if (error) {
            throw new Error(error);
        }
        let userData = JSON.parse(data);
        userData.map((data) => {
            console.table(data);
        });
    });
});

const fs = require("fs");

try {
    console.log("Before Sync. reading");
    const data = fs.readFileSync("./file.txt", "utf-8");
    if (data) console.log(data);
    console.log("After Sync. reading");
} catch (error) {
    throw new Error(error);
}

try {
    fs.writeFileSync("file2.txt", "Hi");
    console.log("Succsess");
} catch (error) {
    throw new Error(error);
}

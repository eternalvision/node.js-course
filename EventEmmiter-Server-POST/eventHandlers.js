const emitter = require("./eventEmitter");

emitter.on("requestData", (data) => {
    console.log("Данные получены", data);

    setTimeout(() => {
        emitter.emit("responseData", `Данные обработались`);
        emitter.emit("parsedData", data);
    }, 1000);
});

emitter.on("parsedData", (data) => {
    const ParsedData = JSON.parse(data);

    console.log(ParsedData.Name);
    console.log(ParsedData.Age);
});

emitter.on("responseData", (processedData) => {
    console.log(processedData);
});

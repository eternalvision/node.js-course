const EventEmitter = require("events");

const emetter = new EventEmitter();

const GetProcess = (message) => {
    console.log(message);
};

emetter.on("start", GetProcess);

emetter.on("process", GetProcess);

emetter.on("end", GetProcess);

emetter.emit("start", "Starting process");
emetter.emit("process", "Processes...");
emetter.emit("end", "End of the process");

emetter.removeAllListeners("start");
emetter.removeAllListeners("process");
emetter.removeAllListeners("end");

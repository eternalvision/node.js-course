const EventEmitter = require("events");

const emitter = new EventEmitter();

const GetName = (name) => {
    console.log(`Hello ${name}`);
};

emitter.on("greet", GetName);

emitter.emit("greet", "Aleksandr");
emitter.emit("greet", "Vlad");

emitter.removeListener("greet", GetName);

emitter.once("connect", () => {
    console.log("Connected succsesful! - Выполнится один раз");
});

emitter.emit("connect");
emitter.emit("connect");

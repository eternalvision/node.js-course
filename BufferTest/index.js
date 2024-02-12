// const { Buffer } = require("node:buffer");

//! выделение памяти
// let buffer = Buffer.alloc(11);
// console.log(buffer);

//! заполнение массивом
// const mass = [1, 2, 3, 4, 5];
// let bufferFromArray = Buffer.from(mass, "utf-8");
// console.log(bufferFromArray);

//! заполнение строкой
// let bufferFromString = Buffer.from("Hello world", "utf-8");
// console.log(bufferFromString);

//! небезопасное но быстрое выделение памяти которое нужно сразу же заполнить
// let bufferUnsafe = Buffer.allocUnsafe(15);
// console.log(bufferUnsafe);

//! копирование данных
// let newBuffer = Buffer.from(bufferFromArray);
// console.log(newBuffer);

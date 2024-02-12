// const { Buffer } = require("node:buffer");

//! Выделение памяти
// let buffer = Buffer.alloc(11);
// console.log(buffer);

//! Запись
// buffer.write("Hello world");
// console.log(buffer);

//! Запись 8-битного числа
// buffer.writeInt8(0x63, 0);
// console.log(buffer);

//! Запись 16-битного числа
// buffer.writeInt16LE(0x0063, 1);
// console.log(buffer);

//! Запись циклом
// for (let i = 0; i < 10; i++) {
//     buffer[i] = i;
// }
// console.log(buffer);

//! Чтение строки
// let buffer = Buffer.from("Hello World");
// let data = buffer.toString();
// let substring = buffer.toString("utf-8", 0, 5);
// console.log(data);
// console.log(substring);

//! Чтение 8-битного числа
// let buffer = Buffer.alloc(11);
// buffer.writeInt8(0x10, 0);
// console.log(buffer.readInt8(0));

//! Чтение из шлобального объекта
// let buffer = Buffer.alloc(12);
// let uintArray = new Uint8Array(buffer);
// console.log(uintArray);

//! Объединение
// let bufferA = Buffer.from("Hello ");
// let bufferB = Buffer.from("World");
// let concatenatedBuffer = Buffer.concat([bufferA, bufferB]);

// console.log(concatenatedBuffer.toString());

//! Ручная конкатенация
// let combinedLength = bufferA.length + bufferB.length;
// let buffer = Buffer.alloc(combinedLength);

// bufferA.copy(buffer, 0);
// bufferB.copy(buffer, bufferA.length);

// console.log(buffer.toString());

//! Сравнение
// let bufA = Buffer.from("Hello");
// let bufB = Buffer.from("Hello");
// let bufC = Buffer.from("World");

// console.log(bufA);
// console.log(bufB);
// console.log(bufC);

// console.log(bufA.equals(bufB));
// console.log(bufA.equals(bufC));

// let result = bufA.compare(bufC);

// switch (result) {
//     case 0:
//         console.log("Буферы равны");
//         break;
//     case 1:
//         console.log("Первый буфер больше");
//         break;
//     case -1:
//         console.log("Первый буфер меньше");
//         break;
//     default:
//         console.log("Error");
// }

//! Сортировка
// let buffers = [Buffer.from("b"), Buffer.from("a"), Buffer.from("c")];
// console.log(buffers);
// buffers.sort(Buffer.compare); //a b c

// for (let buffer of buffers) {
//     console.log(buffer.toString());
// }

//! Копирование
// let sourceBuffer = Buffer.from("Hello World"); // 48 65 6c 6c 6f 20 57 6f 72 6c 64
// let targetBuffer = Buffer.alloc(11); // 00 00 00 00 00 00 00 00

// sourceBuffer.copy(targetBuffer, 0, 6, 11);
// console.log(targetBuffer.toString());

// let copyBuffer = Buffer.from(sourceBuffer);
// console.log(copyBuffer.toString());

//! Конвертация буфера в JSON
// const data = [
//     {
//         name: "Artem Artemov",
//         age: 30,
//     },
//     {
//         name: "Ivan Ivanov",
//         age: 40,
//     },
// ];

// let buffer = Buffer.from(JSON.stringify(data));

// let json = buffer.toJSON();
// let string = JSON.stringify(json);
// let parsedJSON = JSON.parse(string);

// let newBuffer = Buffer.from(parsedJSON.data).toString();

// console.log(json);
// console.log(string);
// console.log(parsedJSON);
// console.log(JSON.parse(newBuffer));

import fs from "fs/promises"; //file system
// import { Modules } from "./modules/index.js";

// const { GetNumbers } = Modules;

//? чтение текста из файла
// const readFile = async () => {
//     try {
//         const text = await fs.readFile("./files/file.txt", "utf-8");
//         console.log(text);
//         return text;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// readFile();

//? перезапись текста
// const writeFile = async () => {
//     try {
//         const inputResult = await fs.writeFile(
//             "./files/file.txt",
//             GetNumbers(10),
//         );
//         return inputResult;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// writeFile();

//? добавление текста
// const addText = async () => {
//     try {
//         const result = await fs.appendFile(
//             "./files/file2.txt",
//             "\nНовая строка",
//         );
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// addText();

//? переименование файла
// const renameFile = async (fileName) => {
//     try {
//         const result = await fs.rename(
//             "./files/renameex.txt",
//             `./files/${fileName}.txt`,
//         );
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// renameFile("qwe");

//? удаление
// const deleteFile = async () => {
//     try {
//         const deleteFile = await fs.unlink("./files/qwe.txt");
//         return deleteFile;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// deleteFile();

//? чтение файлов
// const readDirectory = async () => {
//     try {
//         const directory = await fs.readdir("./").then((files) => {
//             return Promise.all(
//                 files.map(async (filename) => {
//                     const stats = await fs.stat(filename);
//                     return {
//                         Name: filename,
//                         Size: stats.size,
//                         Date: stats.mtime,
//                     };
//                 }),
//             );
//         });
//         console.table(directory);
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// readDirectory();

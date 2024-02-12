import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);

const GetFileName = (filename) => {
    console.log(filename.split(path.sep).reverse()[0]);
};

//! Unix Systems - /

//! Windows - \\

GetFileName(__filename);

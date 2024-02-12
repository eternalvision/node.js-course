const path = require("path");

// console.log(__dirname);
// console.log(__filename);

//? for windows
// const GetFileName = (filename) => {
//     return filename.split("\\").reverse()[0];
// };

// console.log(GetFileName(__filename));

//? for all
const GetFileName = (filename) => {
    return path.basename(filename);
};

console.log(GetFileName(__filename));

require("dotenv").config();

global.foo = 3;
console.log(foo);

// console.log(global.process.env.OS);
// console.log(global.process.env);
// console.log(global.process.env.USERNAME);

const { USERNAME_DATA, PASS } = process.env;

console.log(USERNAME_DATA, PASS);

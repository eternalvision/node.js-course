require("dotenv").config();

const { SECRET_KEY, NODE_ENV } = process.env;

console.log(SECRET_KEY);
console.log(NODE_ENV);

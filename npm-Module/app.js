const uuid = require("uuid");

const { GetSum } = require("./modules/sum");

console.log(uuid.v4());

console.log("hi");
console.log(GetSum(5, 15));

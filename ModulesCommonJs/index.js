const { users } = require("./modules");

const currentMonth = require("./modules").getCurrentMonth();

const date = new Date();

console.log(users());

console.log(`Current month is ${currentMonth}`);

console.log(`Today is ${date.getFullYear()}`);

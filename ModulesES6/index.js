import { NumberFunctions } from "./modules/index.js";

const { GetNumbers, SumNumbers } = NumberFunctions;

const mass = GetNumbers(5);

const SumResult = SumNumbers({ a: 5, b: 15 });

console.log(mass);
console.log(SumResult);

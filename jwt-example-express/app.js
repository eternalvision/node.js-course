require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const payload = { id: 123456, username: "Larson" };

// 1. данные
// 2. как шифровать
// 3. время жизни токена
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
console.log(token);

const decode = jwt.decode(token);
console.log(decode);

// const verify = jwt.verify(token, SECRET_KEY);
// console.log(verify);

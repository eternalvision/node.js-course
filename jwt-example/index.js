const jwt = require("jsonwebtoken");

const payload = {
    id: "sdopjfgo342u50o23",
    username: "larson55",
};

const secret = "SecretWorD";

const token = jwt.sign(payload, secret);

console.log(token);

const decode = jwt.decode(token);

console.log(decode);

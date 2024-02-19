const bcrypt = require("bcrypt");

// количество раундов генерации соли
const saltRounds = 10;

// promise с хешем
const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

// promise с результатом сравнения
const checkPassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

const password = "UserPassword123@";

hashPassword(password).then((hashPassword) => {
    console.log(`Password: ${password} | Hashed Password: ${hashPassword}`);

    checkPassword("UserPassword123@", hashPassword).then((result) => {
        if (result) {
            console.log("Password correct");
        } else {
            console.log("Password incorrect");
        }
    });
});

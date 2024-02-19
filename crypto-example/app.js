const crypto = require("crypto");

const algorithm = "aes-256-cbc"; // block chaining cryptovallet
const password = "sonfopsidj4363764810"; // => hash => crypto
const key = crypto.scryptSync(password, "salt", 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
};

const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(encrypted.iv, "hex"),
    );
    let decrypted = decipher.update(encrypted.encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

const data = "This is secret data";
const encrypted = encrypt(data);
console.log("Encrypted data:", encrypted);

const decrypted = decrypt(encrypted);
console.log(`Decrypted data: ${decrypted}`);

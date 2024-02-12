const fs = require("fs").promises;

const GetUserData = async (data) => {
    return data.map(({ id, name, surName }) => {
        console.log(`${id} - ${name} ${surName}`);
    });
};

const GetJSON = async () => {
    try {
        const data = await fs.readFile("./nonblocktest.json", "utf-8");
        GetUserData(JSON.parse(data));
    } catch (error) {
        throw new Error(error);
    }
};

GetJSON();

console.log("Чтение файла началось");

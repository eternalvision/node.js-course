// const { MongoClient } = require("mongodb");
// const uri =
//     "mongodb+srv://alpryadchenko:yYNfooHaUX1a1BYg@nodemongowork.rpr3zez.mongodb.net/";

// const client = new MongoClient(uri);

// const ConnectDB = async () => {
//     try {
//         await client.connect();
//         console.log("Connected succsessfuly");
//     } catch (error) {
//         console.error(error);
//     }
// };

// module.exports = { client, ConnectDB };

const mongoose = require("mongoose");
const uri =
    "mongodb+srv://alpryadchenko:yYNfooHaUX1a1BYg@nodemongowork.rpr3zez.mongodb.net/";

mongoose
    .connect(uri)
    .then(() => console.log("Connected succsessful"))
    .catch((err) => console.log(err));

module.exports = { mongoose };

const mongoose = require("mongoose");
const app = require("./app");

const { PORT, MONGO_STRING } = process.env;

mongoose.set("strictQuery", true);

mongoose
    .connect(MONGO_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

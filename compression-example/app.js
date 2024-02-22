const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();

const PORT = 3101;

app.use(
    compression({
        level: 6,
        threshold: "10kb",
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }

            return compression.filter(req, res);
        },
    }),
);

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT);

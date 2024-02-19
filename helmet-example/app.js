const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://test.cdn.com"],
            },
        },
    }),
);

app.listen(3101);

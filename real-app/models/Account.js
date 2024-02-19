require("dotenv").config();
const { Schema, model } = require("mongoose");

module.exports = model(
    "Account",
    Schema(
        {
            name: {
                type: String,
            },
            email: {
                type: String,
                unique: true,
            },
            password: {
                type: String,
            },
        },
        { timestamps: true },
    ),
);

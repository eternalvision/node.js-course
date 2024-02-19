require("dotenv").config();
const { Schema, model } = require("mongoose");

const { SECURE_TOKEN } = process.env;

module.exports = model(
    "Employee",
    Schema(
        {
            username: { type: String, required: true, unique: true },
            name: { type: String, required: true },
            surname: { type: String, required: true },
            email: {
                type: String,
                required: true,
                validate: {
                    validator: (v) => /\S+@\S+\.\S+/.test(v),
                    message: (props) =>
                        `${props.value} is not a valid email address!`,
                },
            },
            phone: { type: String },
            token: { type: String, default: SECURE_TOKEN },
        },
        { timestamps: true },
    ),
);

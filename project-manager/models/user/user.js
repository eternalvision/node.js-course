const { Schema, model } = require("mongoose");
const userValidation = require("./userValidation");

const userSchema = new Schema({
    name: String,
    username: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    password: String,
});

module.exports = { User: model("User", userSchema), userValidation };

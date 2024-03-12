const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    username: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    password: String,
});

module.exports = model("User", userSchema);

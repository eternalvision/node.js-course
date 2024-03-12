const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = model("User", userSchema);

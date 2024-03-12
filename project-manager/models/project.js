const { Schema, model } = require("mongoose");

const projectSchema = Schema({
    name: String,
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Project", projectSchema);

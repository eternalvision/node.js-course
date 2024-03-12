const { Schema, model } = require("mongoose");
const projectValidation = require("./projectValidation");

const projectSchema = Schema({
    name: String,
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = {
    Project: model("Project", projectSchema),
    projectValidation,
};

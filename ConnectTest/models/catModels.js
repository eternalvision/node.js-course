const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    features: [String],
});

const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat;

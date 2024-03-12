const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const genreList = ["fantastic", "love"];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/; // 16-10-2009

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            required: true,
        },
        genre: {
            type: String,
            enum: genreList,
            required: true,
        },
        date: {
            type: String,
            match: dateRegexp,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

bookSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string()
        .valid(...genreList)
        .required(),
    date: Joi.string().pattern(dateRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

const Book = model("book", bookSchema);

module.exports = {
    Book,
    schemas,
};

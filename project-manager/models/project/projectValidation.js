const Joi = require("joi");

const projectCreateValidation = Joi.object({
    name: Joi.string().min(3).required(),
    userIds: Joi.array().items(Joi.string().required()),
});

const projectUpdateValidation = Joi.object({
    name: Joi.string().min(3).optional(),
    userIds: Joi.array().items(Joi.string().optional()),
});

module.exports = {
    projectCreateValidation,
    projectUpdateValidation,
};

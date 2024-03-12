const Joi = require("joi");

const registerValidation = Joi.object({
    name: Joi.string().min(2).required(),
    username: Joi.string().min(4).required(),
    projects: Joi.array().items(Joi.string().required()),
    password: Joi.string().min(6).required(),
});

const loginValidation = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
});

const updatePasswordValidation = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
});

const updateProfileValidation = Joi.object({
    name: Joi.string().min(2).optional(),
    username: Joi.string().min(2).optional(),
    projects: Joi.array().items(Joi.string().optional()),
});

module.exports = {
    registerValidation,
    loginValidation,
    updatePasswordValidation,
    updateProfileValidation,
};

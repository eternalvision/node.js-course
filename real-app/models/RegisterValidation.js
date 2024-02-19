const Joi = require("joi");

module.exports = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "Name is required",
        }),
        email: Joi.string().required().email().messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
        }),
        password: Joi.string().required().min(6).max(10).messages({
            "string.empty": "Password is required",
            "string.password": "Password must be 6-10 characters long",
        }),
    });
    return schema.validate(data);
};

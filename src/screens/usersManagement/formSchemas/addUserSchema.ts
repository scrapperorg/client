import joi from "joi";

export const addUserSchema = joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    role: joi.string().required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(6).max(20).required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required().label('Parolele nu coincid')
});

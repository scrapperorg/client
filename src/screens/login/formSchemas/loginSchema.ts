import joi from "joi";

export const loginSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Adresa de email trebuie sa fie de forma nume@adresa.ceva',
            'string.empty': 'Acest camp este obligatoriu',
        }),
    password: joi
        .string()
        // .alphanum()
        .required()
        .messages({ 'string.empty': 'Acest camp este obligatoriu' }),
});

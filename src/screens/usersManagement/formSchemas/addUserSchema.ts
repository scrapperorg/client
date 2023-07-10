import joi from 'joi';

export const addUserSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({ 'string.empty': 'Camp obligatoriu! Trebuie sa introduceti prenumele.' }),
  surname: joi
    .string()
    .required()
    .messages({ 'string.empty': 'Camp obligatoriu! Trebuie sa introduceti numele.' }),
  role: joi
    .string()
    .required()
    .messages({ 'string.empty': 'Camp obligatoriu! Trebuie sa selectati un rol.' }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Camp obligatoriu! Trebuie sa introduceti un email.',
      'string.email':
        'Adresa de email invalida! Adresa trebuie sa fie de forma exemplu@exemplu.com.',
    }),
  password: joi
    .string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Camp obligatoriu! Trebuie sa introduceti o parola.',
      'string.min': 'Parola trebuie sa aiba minim 6 caractere.',
    }),
  confirmPassword: joi
    .any()
    .valid(joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Parolele nu coincid' }),
});

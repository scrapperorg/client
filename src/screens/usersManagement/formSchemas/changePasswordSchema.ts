import joi from 'joi';

export const changePasswordSchema = joi.object({
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

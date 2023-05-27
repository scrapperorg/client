import joi from "joi";

export const documentDetailsSchema = joi.object({
    assignedUser: joi.string().required().messages({ 'string.empty': 'Camp obligatoriu! Trebuie sa selectati un responsabil.' }),
    deadline: joi.date(),
    status: joi.string(),
    decision: joi.string(),
});

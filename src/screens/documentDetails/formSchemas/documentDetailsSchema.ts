import joi from "joi";

export const documentDetailsSchema = joi.object({
    assignedUser: joi.string().optional(),
    deadline: joi.date(),
    status: joi.string(),
    decision: joi.string(),
});

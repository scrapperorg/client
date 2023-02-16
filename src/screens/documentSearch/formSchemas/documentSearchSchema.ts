import joi from "joi";

export const documentSearchSchema = joi.object({
    title: joi.string().optional(),
    postOcrContent: joi.string().optional(),
});

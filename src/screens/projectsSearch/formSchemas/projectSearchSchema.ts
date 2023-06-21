import joi from "joi";

export const projectSearchSchema = joi.object({
    title: joi.string().allow(null, ''),
    initiator: joi.string().allow(null, ''),
    source: joi.string().allow(null, ''),
    createdAfter: joi.string().optional(),
    createdBefore: joi.string().optional(),
    presentsInterest: joi.boolean().optional(),
    postOcrContent: joi.string().optional(),
});

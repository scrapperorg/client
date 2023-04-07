import joi from "joi";

export const documentSearchSchema = joi.object({
    identificator: joi.string().allow(null, ''),
    title: joi.string().allow(null, ''),
    source: joi.string().allow(null, ''),
    status: joi.string().allow(null, ''),
    assignedUserId: joi.string().allow(null, ''),
    projectId: joi.string().allow(null, ''),
    publishedAfter: joi.string().allow(null, ''),
    publishedBefore: joi.string().allow(null, ''),
    postOcrContent: joi.string().allow(null, ''),
    isRulesBreaker: joi.boolean().optional(),
});

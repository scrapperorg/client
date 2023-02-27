import joi from "joi";

export const documentSearchSchema = joi.object({
    identificator: joi.string().allow(''),
    title: joi.string().allow(''),
    source: joi.string().allow(''),
    status: joi.string().allow(''),
    assignedUserId: joi.string().allow(''),
    projectId: joi.string().allow(''),
    publishedAfter: joi.string().allow(''),
    publishedBefore: joi.string().allow(''),
    postOcrContent: joi.string().allow(''),
    isRulesBreaker: joi.boolean(),
});

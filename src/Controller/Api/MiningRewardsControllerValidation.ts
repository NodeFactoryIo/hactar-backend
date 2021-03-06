import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateMiningRewardsRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: [{
        cid: string;
        reward: string;
        nodeInfo: {
            address: string;
            url: string;
        };
    }];
}

export const CreateMiningRewardsValidationSchema = Joi.array().items(
    Joi.object({
        cid: Joi.string().required(),
        reward: Joi.string().allow("").required(),
        nodeInfo: Joi.object({
            address: Joi.string().required(),
            url: Joi.string().required()
        })
    })
);

export interface FetchMiningRewardsRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        filter: string;
    };
}

export const FetchMiningRewardsValidationSchema = Joi.object({
    filter: Joi.string().valid('day', 'week', 'month', 'year').required(),
});

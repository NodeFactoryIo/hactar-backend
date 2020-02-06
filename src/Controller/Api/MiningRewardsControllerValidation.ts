import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateMiningRewardsRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: [{
        cid: string;
        nodeInfo: {
            address: string;
            url: string;
        };
    }];
}

export const CreateMiningRewardsValidationSchema = Joi.array().items(
    Joi.object({
        cid: Joi.string().required(),
        nodeInfo: Joi.object({
            address: Joi.string().required(),
            url: Joi.string().required()
        })
    })
);

import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeBalanceRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        balance: string;
        nodeInfo: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodeBalanceValidationSchema = Joi.object({
    balance: Joi.string().regex(/^\d+$/).required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    })
});

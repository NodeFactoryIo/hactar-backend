import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodePastDealsRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        cid: string;
        state: number;
        size: string;
        provider: string;
        price: string;
        duration: number;
        nodeInfo: {
            url: string;
            address: string;
        };
    };
}


export const CreateNodePastDealsValidationSchema = Joi.object({
    cid: Joi.string().required(),
    state: Joi.number().required(),
    size: Joi.string().regex(/^\d+$/).required(),
    provider: Joi.string().required(),
    price: Joi.string().regex(/^\d+$/).required(),
    duration: Joi.number().required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required()
    })
});

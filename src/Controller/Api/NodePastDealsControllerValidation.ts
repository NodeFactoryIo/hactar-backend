import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodePastDealsRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        pastDeals: [{
            cid: string;
            state: number;
            size: string;
            provider: string;
            price: string;
            duration: number;
        }];
        nodeInfo: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodePastDealsValidationSchema = Joi.object({
    pastDeals: Joi.array().items(Joi.object({
        cid: Joi.string().required(),
        state: Joi.number().required(),
        size: Joi.string().regex(/^\d+$/).required(),
        provider: Joi.string().required(),
        price: Joi.string().regex(/^\d+$/).required(),
        duration: Joi.number().required(),
    })),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required()
    })
});

export interface FetchNodePastDealsRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        from: number;
        to: number;
        orderBy: string;
    };
}

export const FetchNodePastDealsValidationSchema = Joi.object({
    from: Joi.number().min(0).required(),
    to: Joi.number().greater(Joi.ref('from')).required(),
    orderBy: Joi.string().uppercase().valid('ASC', 'DESC').required()
});

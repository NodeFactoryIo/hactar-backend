import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        token: string;
        nodeInfo: {
            url: string;
            address: string;
        };
        name: string;
        description: string;
        hasEnabledNotifications: boolean;
    };
}

export const CreateNodeValidationSchema = Joi.object({
    token: Joi.string().required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    }),
    hasEnabledNotifications: Joi.bool()
});

export const UpdateNodeValidationSchema = Joi.object({
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    }),
    name: Joi.string(),
    description: Joi.string()
});

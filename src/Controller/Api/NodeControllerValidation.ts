import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        token: string;
        node: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodeValidationSchema = Joi.object({
    token: Joi.string().required(),
    node: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    })
});

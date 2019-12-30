import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        url: string;
        token: string;
        address: string;
    };
}

export const CreateNodeValidationSchema = Joi.object({
    url: Joi.string().required(),
    token: Joi.string().required(),
    address: Joi.string().required()
});

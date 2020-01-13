import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        email: string;
        password: string;
    };
}

export const CreateUserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

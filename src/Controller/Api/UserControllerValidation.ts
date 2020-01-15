import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        email: string;
        password: string;
    };
}

export const UserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

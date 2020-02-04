import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeUptimeRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        isWorking: boolean;
        node: {
            url: string;
            address: string;
        };
    };

}

export const CreateNodeUptimeValidationSchema = Joi.object({
    isWorking: Joi.boolean().required(),
    node: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    })
});

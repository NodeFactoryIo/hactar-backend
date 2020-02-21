import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeUptimeRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        isWorking: boolean;
        nodeInfo: {
            url: string;
            address: string;
        };
    };

}

export const CreateNodeUptimeValidationSchema = Joi.object({
    isWorking: Joi.boolean().required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    })
});

export interface FetchNodeUptimeRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        filter: string;
    };
}

export const FetchNodeUptimeValidationSchema = Joi.object({
    filter: Joi.string().required(),
});

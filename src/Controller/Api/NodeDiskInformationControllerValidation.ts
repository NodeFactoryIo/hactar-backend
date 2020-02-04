import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeDiskInformationRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        freeSpace: number;
        takenSpace: number;
        node: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodeDiskInforamtionValidationSchema = Joi.object({
    freeSpace: Joi.number().required(),
    takenSpace: Joi.number().required(),
    node: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    })
});

import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeGeneralInfoRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        version: string;
        sectorSize: number;
        minerPower: number;
        totalPower: number;
        node: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodeGeneralInfoValidationSchema = Joi.object({
    version: Joi.string().required(),
    sectorSize: Joi.number().required(),
    minerPower: Joi.number().required(),
    totalPower: Joi.number().required(),
    node: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required()
    })
});

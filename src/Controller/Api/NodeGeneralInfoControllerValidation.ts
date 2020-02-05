import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeGeneralInfoRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        version: string;
        sectorSize: string;
        minerPower: string;
        totalPower: string;
        nodeInfo: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodeGeneralInfoValidationSchema = Joi.object({
    version: Joi.string().required(),
    sectorSize: Joi.string().regex(/^\d+$/).required(),
    minerPower: Joi.string().regex(/^\d+$/).required(),
    totalPower: Joi.string().regex(/^\d+$/).required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required()
    })
});

import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateGeneralMinerInfoRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        version: string;
        walletAddress: string;
        sectorSize: string;
        numberOfSectors: number;
        minerPower: string;
        totalPower: string;
        nodeInfo: {
            url: string;
            address: string;
        };
    };
}

export const CreateGeneralMinerInfoValidationSchema = Joi.object({
    version: Joi.string().required(),
    walletAddress: Joi.string().required(),
    sectorSize: Joi.string().regex(/^\d+$/).required(),
    numberOfSectors: Joi.number().required(),
    minerPower: Joi.string().regex(/^\d+$/).required(),
    totalPower: Joi.string().regex(/^\d+$/).required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required()
    })
});

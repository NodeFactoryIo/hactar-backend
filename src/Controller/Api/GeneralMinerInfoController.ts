import {Request, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {GeneralMinerInfoService} from "../../Services/GeneralMinerInfoService";
import {CreateGeneralMinerInfoRequestSchema} from "./GeneralMinerInfoControllerValidation";
import logger from "../../Services/Logger";

export class GeneralMinerInfoController {

    private generalMinerInfoService: GeneralMinerInfoService;

    constructor(generalMinerInfoService: GeneralMinerInfoService) {
        this.generalMinerInfoService = generalMinerInfoService;
    }

    public async updateOrCreateGeneralMinerInfo(
        req: ValidatedRequest<CreateGeneralMinerInfoRequestSchema>,
        res: Response) {
        try {
            const {version, sectorSize, minerPower, totalPower} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.generalMinerInfoService.updateOrCreateGeneralMinerInfo(
                version, sectorSize, minerPower, totalPower, nodeId);
            res.status(200).json(result)
        } catch (e) {
            logger.error(`Error occurred on storing/updating general miner info in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async fetchGeneralMinerInfo(req: Request, res: Response) {
        try {
            const nodeId = res.locals.node.id;
            const result = await this.generalMinerInfoService.fetchGeneralMinerInfo(nodeId);
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({error: "Node not found."});
            }
        } catch (e) {
            logger.error(`Error occurred on fetching general miner info in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

import {Request, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodeGeneralInfoService} from "../../Services/NodeGeneralInfoService";
import {CreateNodeGeneralInfoRequestSchema} from "./NodeGeneralInfoControllerValidation";
import logger from "../../Services/Logger";

export class NodeGeneralInfoController {

    private nodeGeneralInfoService: NodeGeneralInfoService;

    constructor(nodeGeneralInfoService: NodeGeneralInfoService) {
        this.nodeGeneralInfoService = nodeGeneralInfoService;
    }

    public async updateOrCreateNodeGenralInfo(
        req: ValidatedRequest<CreateNodeGeneralInfoRequestSchema>,
        res: Response) {
        try {
            const {version, sectorSize, minerPower, totalPower} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.nodeGeneralInfoService.updateOrCreateNodeGenralInfo(
                version, sectorSize, minerPower, totalPower, nodeId);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            logger.error(`Error occurred on storing general info in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async fetchNodeGenralInfo(req: Request, res: Response) {
        try {
            const nodeId = res.locals.node.id;
            const result = await this.nodeGeneralInfoService.fetchNodeGenralInfo(nodeId);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            console.log(e)
            logger.error(`Error occurred on storing general info in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

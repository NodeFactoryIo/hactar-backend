import {Request, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {CreateNodeBalanceRequestSchema} from "./NodeBalanceControllerValidation";
import {NodeBalanceService} from "../../Services/NodeBalanceService";
import logger from "../../Services/Logger";

export class NodeBalanceController {

    private nodeBalanceService: NodeBalanceService;

    constructor(nodeBalanceService: NodeBalanceService) {
        this.nodeBalanceService = nodeBalanceService;
    }

    public async storeNodeBalance(req: ValidatedRequest<CreateNodeBalanceRequestSchema>, res: Response) {
        try {
            const {balance} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.nodeBalanceService.storeNodeBalance(balance, nodeId);
            res.status(201).json(result)
        } catch (e) {
            logger.error(`Error occurred on storing node balance in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async fetchNodeBalance(req: Request, res: Response) {
        try {
            const nodeId = res.locals.node.id;
            const result = await this.nodeBalanceService.fetchNodeBalance(nodeId);
            res.status(200).json(result)
        } catch (e) {
            logger.error(`Error occurred on fetching node balance in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

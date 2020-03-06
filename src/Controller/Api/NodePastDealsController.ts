import {Response, Request} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodePastDealsService} from "../../Services/NodePastDealsService";
import {CreateNodePastDealsRequestSchema, FetchNodePastDealsRequestSchema} from "./NodePastDealsControllerValidation";
import logger from "../../Services/Logger";
import {NodePastDeal} from "../../Models/NodePastDealModel";

export class NodePastDealsController {

    private nodePastDealsService: NodePastDealsService;

    constructor(nodePastDealsService: NodePastDealsService) {
        this.nodePastDealsService = nodePastDealsService;
    }

    public async updateOrCreatePastDeal(
        req: ValidatedRequest<CreateNodePastDealsRequestSchema>,
        res: Response) {
        try {
            const {pastDeals} = req.body;
            const nodeId = res.locals.node.id;
            const pastDealsWithNodeId = pastDeals.map(o => ({...o, nodeId: nodeId})) as NodePastDeal[];
            const result = await this.nodePastDealsService.replacePastDealsForNode(pastDealsWithNodeId, nodeId);
            res.status(200).json(result)
        } catch (e) {
            logger.error(`Error occurred on storing/updating node past deal in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async fetchNodePastDeals(req: ValidatedRequest<FetchNodePastDealsRequestSchema>, res: Response) {
        try {
            const {from, to, orderBy} = req.query;
            const nodeId = res.locals.node.id;
            const result = await this.nodePastDealsService.fetchNodePastDeals(
                nodeId, from, to, orderBy);
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({error: "No past deals found."});
            }
        } catch (e) {
            logger.error(`Error occurred on fetching node past deals in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async getRecordsCount(req: Request, res: Response): Promise<void> {
        try {
            const nodeId = res.locals.node.id;
            const result = await this.nodePastDealsService.countRecords(nodeId);
            res.status(200).json(result)
        } catch (e) {
            logger.error(`Error occurred on fetching past deals counts in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

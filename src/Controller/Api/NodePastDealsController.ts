import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodePastDealsService} from "../../Services/NodePastDealsService";
import {CreateNodePastDealsRequestSchema} from "./NodePastDealsControllerValidation";
import logger from "../../Services/Logger";
import {NodePastDeal, NodePastDealModel} from "../../Models/NodePastDealModel";

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
}

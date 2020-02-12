import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodePastDealsService} from "../../Services/NodePastDealsService";
import {CreateNodePastDealsRequestSchema} from "./NodePastDealsControllerValidation";
import logger from "../../Services/Logger";

export class NodePastDealsController {

    private nodePastDealsService: NodePastDealsService;

    constructor(nodePastDealsService: NodePastDealsService) {
        this.nodePastDealsService = nodePastDealsService;
    }

    public async updateOrCreatePastDeal(
        req: ValidatedRequest<CreateNodePastDealsRequestSchema>,
        res: Response) {
        try {
            const {cid, state, size, provider, price, duration} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.nodePastDealsService.updateOrCreatePastDeal(
                cid, state, size, provider, price, duration, nodeId);
            res.status(200).json(result)
        } catch (e) {
            logger.error(`Error occurred on storing node past deal in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

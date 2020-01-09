import {Response, Request} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodeUptimeService} from "../../Services/NodeUptimeService";
import {CreateNodeUptimeRequestSchema} from "./NodeUptimeControllerValidation";
import logger from "../../Services/Logger";

export class NodeUptimeController {
    private nodeUptimeService: NodeUptimeService;

    constructor(nodeUptimeService: NodeUptimeService) {
        this.nodeUptimeService = nodeUptimeService;
    }

    public async storeNodeUptime(req: ValidatedRequest<CreateNodeUptimeRequestSchema>, res: Response): Promise<any> {
        try {
            const {isWorking} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.nodeUptimeService.createNodeUptime(isWorking, nodeId);
            res.status(201).json(result);
        } catch (e) {
            logger.error(`Error occured on storing node uptime in contoroller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."})
        }
    }

    public async getNodeUptime(req: Request, res: Response): Promise<any> {
        try {
            const nodeId = res.locals.node.id;
            const result = await this.nodeUptimeService.getNodeUpTimeByData(nodeId);
            res.status(200).json(result);
        } catch (e) {
            logger.error(`Error occured on fetching node in controller: ${e}`);
            res.status(500).json({error: "An unknown error occured."})
        }
    }
}

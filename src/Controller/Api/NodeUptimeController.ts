import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodeUptimeService} from "../../Services/NodeUptimeService";
import {CreateNodeUptimeRequestSchema, FetchNodeUptimeRequestSchema} from "./NodeUptimeControllerValidation";
import logger from "../../Services/Logger";
import {NodeUptimeNotificationService} from "../../Services/NodeUptimeNotificationService";

export class NodeUptimeController {
    private nodeUptimeService: NodeUptimeService;
    private nodeUptimeNotificationService: NodeUptimeNotificationService;

    constructor(nodeUptimeService: NodeUptimeService, nodeUptimeNotificationService: NodeUptimeNotificationService) {
        this.nodeUptimeService = nodeUptimeService;
        this.nodeUptimeNotificationService = nodeUptimeNotificationService;
    }

    public async storeNodeUptime(req: ValidatedRequest<CreateNodeUptimeRequestSchema>, res: Response): Promise<any> {
        try {
            const {isWorking} = req.body;
            const nodeId = res.locals.node.id;
            const nodeUptime = await this.nodeUptimeService.createNodeUptime(isWorking, nodeId);
            await this.nodeUptimeNotificationService.processNodeUptime(nodeUptime);
            res.status(201).json(nodeUptime);
        } catch (e) {
            logger.error(`Error occurred on storing node uptime in contoroller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."})
        }
    }

    public async fetchNodeUptime(req: ValidatedRequest<FetchNodeUptimeRequestSchema>, res: Response): Promise<any> {
        try {
            const nodeId = req.params.nodeId;
            const result = await this.nodeUptimeService.fetchNodeUptime(nodeId, req.query.filter);
            res.status(200).json(result);
        } catch (e) {
            logger.error(`Error occurred on fetching node uptime in controller: ${e}`);
            res.status(500).json({error: "An unknown error occured."})
        }
    }
}

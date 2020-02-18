import {Response, Request} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodeUptimeService} from "../../Services/NodeUptimeService";
import {CreateNodeUptimeRequestSchema} from "./NodeUptimeControllerValidation";
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
            logger.error(`Error occured on storing node uptime in contoroller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."})
        }
    }

    public async getNodeUptime(req: Request, res: Response): Promise<any> {
        try {
            const nodeId = req.params.nodeId;
            const result = await this.nodeUptimeService.getNodeUpTimeByPk(nodeId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({error: "Node not found."});
            }
        } catch (e) {
            logger.error(`Error occured on fetching node in controller: ${e}`);
            res.status(500).json({error: "An unknown error occured."})
        }
    }
}

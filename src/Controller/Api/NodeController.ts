import {Request, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodeService} from "../../Services/NodeService";
import logger from "../../Services/Logger";
import {CreateNodeRequestSchema} from "./NodeControllerValidation";
import {ServiceError} from "../../Services/ServiceError";

export class NodeController {

    private nodeService: NodeService

    constructor(nodeService: NodeService) {
        this.nodeService = nodeService;
    }

    public async createNode(req: ValidatedRequest<CreateNodeRequestSchema>, res: Response): Promise<any> {
        try {
            const {url, token, address, userId} = req.body;
            const result = await this.nodeService.createNode(url, token, address, userId);
            res.status(201).json(result);
        } catch (e) {
            logger.error(`Error occurred on creating node in controller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async deleteNode(req: Request, res: Response): Promise<any> {
        try {
            const {nodeId} = req.params;
            const node = await this.nodeService.getNodeByPk(nodeId);
            if (node) {
                await this.nodeService.deleteNode(nodeId);
                res.status(200).json(node);
            } else {
                res.status(404).json({error: "Node not found."});
            }
        } catch (e) {
            logger.error(`Error occurred on deleting node in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async getAllUserNodes(req: Request, res: Response) {
        try {
            const userId = res.locals.userId;
            const result = await this.nodeService.getAllNodes(userId);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            if (e instanceof ServiceError) {
                res.status(e.status).json({error: e.message});
            } else {
                logger.error(`Error occurred on fetching user nodes in controller: ${e.message}`);
                res.status(500).json({error: "An uknown error occurred."});
            }
        }
    }
}

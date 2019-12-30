import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { NodeService } from "../../Services/NodeService";
import logger from "../../Services/Logger";
import { CreateNodeRequestSchema } from "./NodeControllerValidation";


export class NodeController {

    private nodeService: NodeService

    constructor(nodeService: NodeService) {
        this.nodeService = nodeService;
    }

    public async createNode(req: ValidatedRequest<CreateNodeRequestSchema>, res: Response): Promise<any> {
        try {
            const { url, token, address } = req.body;
            const result = await this.nodeService.createNode(url, token, address);
            res.status(201).json(result);
        } catch (e) {
            logger.error(`Error occurred on creating node in controller: ${e}`);
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }

    public async deleteNode(req: Request, res: Response): Promise<any> {
        try {
            const { nodeId } = req.params;
            const result = await this.nodeService.deleteNode(nodeId);
            if (result !== 0) {
                res.status(200).json({ message: "Deleted successfully." });
            }
            else {
                res.status(404).json({ message: "Record not found." });
            }
        } catch (e) {
            logger.error(`Error occurred on deleting node in controller: ${e.message}`);
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }

}

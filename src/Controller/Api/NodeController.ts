import { Request, Response } from "express";
import * as Joi from "@hapi/joi";
import { NodeService } from "../../Services/NodeService";
import logger from "../../Services/Logger";
export class NodeController {

    public createNodesValidation = {
        body: {
            url: Joi.string().required(),
            token: Joi.string().required(),
            address: Joi.string().required()
        }
    };

    private nodeService: NodeService

    constructor(nodeService: NodeService) {
        this.nodeService = nodeService;
    }

    public async createNode(req: Request, res: Response): Promise<any> {
        try {
            const { url, token, address } = req.body;
            const result = await this.nodeService.createNode(url, token, address);
            res.status(201).json(result);
        } catch (e) {
            logger.error(`Error occurred on CreateNode in controller: ${e.message}`);
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }

    public async deleteNode(req: Request, res: Response): Promise<any> {
        try {
            const { nodeId } = req.params;
            const node = await this.nodeService.getNode(nodeId);
            if (node) {
                await this.nodeService.deleteNode(nodeId);
                res.status(200).json(node);
            } else {
                res.status(404).json({ error: "Node not found." });
            }
        } catch (e) {
            console.log(e)

            logger.error(`Error occured on DeleteNode in contoller: ${e.message}`);
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }

}

import { Request, Response, NextFunction } from "express";
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

}

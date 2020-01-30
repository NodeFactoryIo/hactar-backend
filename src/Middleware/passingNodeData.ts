import express, {Request} from "express";
import {NodeService} from "../Services/NodeService";
import {Node} from "../Models/Node";
import logger from "../Services/Logger";

export async function passNodeData(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const node = await Node.findByPk(req.params.nodeId)
        const {url, address} = req.body;
        if (node) {
            res.locals.node = node;
        } else {
            const node = await NodeService.getNodeByData(url, address);
            if (node) {
                res.locals.node = node;
            }
        }
        next();
    } catch (e) {
        logger.error(`${e}`);
        res.status(404).json({error: "Node not found."});
    }
}

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
        if (req.params && req.params.nodeId) {
            const node = await Node.findByPk(req.params.nodeId)
            res.locals.node = node;
        } else if (req.body && req.body.nodeInfo) {
            const nodeInfo = req.body.nodeInfo;
            if (nodeInfo) {
                const {url, address} = nodeInfo;
                const node = await NodeService.getNodeByData(url, address);
                if (node) {
                    res.locals.node = node;
                }
            }
        } else {
            const miningRewards = req.body;
            res.locals.miningRewards = miningRewards;
        }
        next();
    } catch (e) {
        logger.error(`${e}`);
        res.status(404).json({error: "Node not found."});
    }
}

import express, {Request} from "express";
import {NodeService} from "../Services/NodeService";
import {Node} from "../Models/Node";
import {MiningRewardInput} from "../Types/MiningRewardInputType";
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
            const node = await NodeService.getNodeByData(req.body.nodeInfo.url, req.body.nodeInfo.address);
            res.locals.node = node;
        } else if (req.body.length > 0) {
            const nodesList = req.body.map(
                (mri: MiningRewardInput) => {
                    return NodeService.getNodeByData(mri.nodeInfo.url, mri.nodeInfo.address);
                }
            )
            res.locals.nodes = await Promise.all(nodesList)
        }
        next();
    } catch (e) {
        logger.error(`${e}`);
        res.status(404).json({error: "Node not found."});
    }
}

import express, {Request} from "express";
import {NodeService} from "../Services/NodeService";

export async function passNodeData(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const {url, address} = req.body;

    const node = await NodeService.getNodeByData(url, address);
    if (node) {
        res.locals.node = node;
        next();
    } else {
        res.status(404).json({error: "Node not found."});
    }
}

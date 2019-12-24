import express from "express";
import { NodeController } from "../Controller/Api/NodeController";
// import validate from 'express-validation'

export function createApiRoutes(
    nodesController: NodeController,
): express.Router {
    const router = express.Router();

    router.post(
        "/user/node", //validate(nodesController.createNodesValidation),
        nodesController.createNode.bind(nodesController));

    return router;
}

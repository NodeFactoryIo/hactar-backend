import express from "express";
import {createValidator} from "express-joi-validation";
import {NodeController} from "../Controller/Api/NodeController";
import {CreateNodeValidationSchema} from "../Controller/Api/NodeControllerValidation";

export function createApiRoutes(
    validator: ReturnType<typeof createValidator>,
    nodesController: NodeController,
): express.Router {
    const router = express.Router();

    router.post(
        "/user/node",
        validator.body(CreateNodeValidationSchema),
        nodesController.createNode.bind(nodesController));

    router.delete(
        "/user/node/:nodeId",
        nodesController.deleteNode.bind(nodesController));

    return router;
}

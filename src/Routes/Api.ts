import express from "express";
import {createValidator} from "express-joi-validation";

import {NodeController} from "../Controller/Api/NodeController";
import {CreateNodeValidationSchema} from "../Controller/Api/NodeControllerValidation";

import {DiskInformationController} from "../Controller/Api/DiskInformationController";
import {CreateDiskInforamtionValidationSchema} from "../Controller/Api/DiskInformationControllerValidation";

import {NodeUptimeController} from "../Controller/Api/NodeUptimeController";
import {CreateNodeUptimeValidationSchema} from "../Controller/Api/NodeUptimeControllerValidation";

import {UserController} from "../Controller/Api/UserController";
import {CreateUserValidationSchema} from "../Controller/Api/UserControllerValidation";

import {passNodeData} from "../Middleware/passingNodeData";

export function createApiRoutes(
    validator: ReturnType<typeof createValidator>,
    nodesController: NodeController,
    diskInformationController: DiskInformationController,
    nodeUptimeController: NodeUptimeController,
    userController: UserController
): express.Router {
    const router = express.Router();

    router.post(
        "/user/node",
        validator.body(CreateNodeValidationSchema),
        nodesController.createNode.bind(nodesController));

    router.delete(
        "/user/node/:nodeId",
        nodesController.deleteNode.bind(nodesController));

    router.post(
        "/diskinfo",
        [validator.body(CreateDiskInforamtionValidationSchema), passNodeData],
        diskInformationController.createDiskData.bind(diskInformationController));

    router.post(
        "/node/uptime",
        [validator.body(CreateNodeUptimeValidationSchema), passNodeData],
        nodeUptimeController.storeNodeUptime.bind(nodeUptimeController));

    router.get(
        "/node/uptime/:nodeId",
        nodeUptimeController.getNodeUptime.bind(nodeUptimeController));

    router.post(
        "/user/register",
        validator.body(CreateUserValidationSchema),
        userController.registerUser.bind(userController));
    return router;
}

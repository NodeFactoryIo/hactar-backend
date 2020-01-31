import express from "express";
import {createValidator} from "express-joi-validation";

import {NodeController} from "../Controller/Api/NodeController";
import {CreateNodeValidationSchema} from "../Controller/Api/NodeControllerValidation";

import {NodeDiskInformationController} from "../Controller/Api/NodeDiskInformationController";
import {CreateNodeDiskInforamtionValidationSchema} from "../Controller/Api/NodeDiskInformationControllerValidation";

import {NodeUptimeController} from "../Controller/Api/NodeUptimeController";
import {CreateNodeUptimeValidationSchema} from "../Controller/Api/NodeUptimeControllerValidation";

import {UserController} from "../Controller/Api/UserController";
import {UserValidationSchema} from "../Controller/Api/UserControllerValidation";

import {passNodeData} from "../Middleware/passingNodeData";
import {AuthorizeUser} from "../Middleware/Authorization";

export function createApiRoutes(
    validator: ReturnType<typeof createValidator>,
    nodesController: NodeController,
    nodeDiskInformationController: NodeDiskInformationController,
    nodeUptimeController: NodeUptimeController,
    userController: UserController
): express.Router {
    const router = express.Router();

    router.post(
        "/user/node",
        validator.body(CreateNodeValidationSchema),
        nodesController.createNode.bind(nodesController));

    router.get(
        "/user/node",
        AuthorizeUser,
        nodesController.getAllUserNodes.bind(nodesController));

    router.delete(
        "/user/node/:nodeId",
        nodesController.deleteNode.bind(nodesController));

    router.post(
        "/user/node/diskinformation",
        [validator.body(CreateNodeDiskInforamtionValidationSchema), passNodeData],
        nodeDiskInformationController.createDiskData.bind(nodeDiskInformationController));

    router.get(
        "/user/node/diskinformation/:nodeId",
        AuthorizeUser,
        nodeDiskInformationController.fetchNodeDiskInfo.bind(nodeDiskInformationController));

    router.post(
        "/user/node/uptime",
        [validator.body(CreateNodeUptimeValidationSchema), passNodeData],
        nodeUptimeController.storeNodeUptime.bind(nodeUptimeController));

    router.get(
        "/user/node/uptime/:nodeId",
        nodeUptimeController.getNodeUptime.bind(nodeUptimeController));

    router.post(
        "/user/register",
        validator.body(UserValidationSchema),
        userController.registerUser.bind(userController));

    router.post(
        "/user/login",
        validator.body(UserValidationSchema),
        userController.loginUser.bind(userController));

    router.post(
        "/user/deamon/login",
        validator.body(UserValidationSchema),
        userController.loginUserDeamonApp.bind(userController));

    return router;

}

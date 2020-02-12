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

import {NodeGeneralInfoController} from "../Controller/Api/NodeGeneralInfoController";
import {CreateNodeGeneralInfoValidationSchema} from "../Controller/Api/NodeGeneralInfoControllerValidation";

import {MiningRewardsController} from "../Controller/Api/MiningRewardsController";
import {CreateMiningRewardsValidationSchema} from "../Controller/Api/MiningRewardsControllerValidation";

import {NodeBalanceController} from "../Controller/Api/NodeBalanceController";
import {CreateNodeBalanceValidationSchema} from "../Controller/Api/NodeBalanceControllerValidation";

import {NodePastDealsController} from "../Controller/Api/NodePastDealsController";
import {CreateNodePastDealsValidationSchema} from "../Controller/Api/NodePastDealsControllerValidation";

import {passNodeData} from "../Middleware/passingNodeData";
import {AuthorizeUser} from "../Middleware/Authorization";

export function createApiRoutes(
    validator: ReturnType<typeof createValidator>,
    nodesController: NodeController,
    nodeDiskInformationController: NodeDiskInformationController,
    nodeUptimeController: NodeUptimeController,
    userController: UserController,
    nodeGeneralInfoController: NodeGeneralInfoController,
    miningRewardsController: MiningRewardsController,
    nodeBalanceController: NodeBalanceController,
    nodePastDealsController: NodePastDealsController

): express.Router {
    const router = express.Router();

    router.post(
        "/user/node",
        [validator.body(CreateNodeValidationSchema), passNodeData, AuthorizeUser],
        nodesController.createNode.bind(nodesController));

    router.get(
        "/user/node",
        [passNodeData, AuthorizeUser],
        nodesController.getAllUserNodes.bind(nodesController));

    router.delete(
        "/user/node/:nodeId",
        [passNodeData, AuthorizeUser],
        nodesController.deleteNode.bind(nodesController));

    router.post(
        "/user/node/diskinformation",
        [validator.body(CreateNodeDiskInforamtionValidationSchema), passNodeData, AuthorizeUser],
        nodeDiskInformationController.createDiskData.bind(nodeDiskInformationController));

    router.get(
        "/user/node/diskinformation/:nodeId",
        [passNodeData, AuthorizeUser],
        nodeDiskInformationController.fetchNodeDiskInfo.bind(nodeDiskInformationController));

    router.post(
        "/user/node/uptime",
        [validator.body(CreateNodeUptimeValidationSchema), passNodeData, AuthorizeUser],
        nodeUptimeController.storeNodeUptime.bind(nodeUptimeController));

    router.get(
        "/user/node/uptime/:nodeId",
        [passNodeData, AuthorizeUser],
        nodeUptimeController.getNodeUptime.bind(nodeUptimeController));

    router.put(
        "/user/node/generalminerinfo",
        [validator.body(CreateNodeGeneralInfoValidationSchema), passNodeData, AuthorizeUser],
        nodeGeneralInfoController.updateOrCreateNodeGeneralInfo.bind(nodeGeneralInfoController));

    router.get(
        "/user/node/generalminerinfo/:nodeId",
        [passNodeData, AuthorizeUser],
        nodeGeneralInfoController.fetchNodeGeneralInfo.bind(nodeGeneralInfoController));

    router.post(
        "/user/node/miningrewards",
        [validator.body(CreateMiningRewardsValidationSchema), passNodeData, AuthorizeUser],
        miningRewardsController.storeMiningRewards.bind(miningRewardsController));

    router.post(
        "/user/node/balance",
        [validator.body(CreateNodeBalanceValidationSchema), passNodeData, AuthorizeUser],
        nodeBalanceController.storeNodeBalance.bind(nodeBalanceController));

    router.put(
        "/user/node/pastdeals",
        [validator.body(CreateNodePastDealsValidationSchema), passNodeData, AuthorizeUser],
        nodePastDealsController.updateOrCreatePastDeal.bind(nodePastDealsController));

    router.post(
        "/user/register",
        validator.body(UserValidationSchema),
        userController.registerUser.bind(userController));

    router.post(
        "/user/login",
        validator.body(UserValidationSchema),
        userController.loginUser.bind(userController));

    router.post(
        "/user/daemon/login",
        validator.body(UserValidationSchema),
        userController.loginUserDaemonApp.bind(userController));

    return router;
}

import express from "express";
import {createValidator} from "express-joi-validation";
import {CreateNodeValidationSchema, UpdateNodeValidationSchema} from "../Controller/Api/NodeControllerValidation";
import {
    CreateNodeUptimeValidationSchema,
    FetchNodeUptimeValidationSchema
} from "../Controller/Api/NodeUptimeControllerValidation";
import {
    CreateNodeDiskInforamtionValidationSchema,
    FetchNodeDiskInforamtionValidationSchema,
} from "../Controller/Api/NodeDiskInformationControllerValidation";
import {UserValidationSchema} from "../Controller/Api/UserControllerValidation";
import {CreateGeneralMinerInfoValidationSchema} from "../Controller/Api/GeneralMinerInfoControllerValidation";
import {
    CreateMiningRewardsValidationSchema,
    FetchMiningRewardsValidationSchema
} from "../Controller/Api/MiningRewardsControllerValidation";
import {CreateNodeBalanceValidationSchema} from "../Controller/Api/NodeBalanceControllerValidation";
import {CreateNodePastDealsValidationSchema} from "../Controller/Api/NodePastDealsControllerValidation";

import {passNodeData} from "../Middleware/passingNodeData";
import {AuthorizeUser} from "../Middleware/Authorization";
import {Controllers} from "../Controllers";

export function createApiRoutes(
    validator: ReturnType<typeof createValidator>,
    controllers: Controllers
): express.Router {
    const router = express.Router();

    router.post(
        "/user/node",
        [validator.body(CreateNodeValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeController.createNode.bind(controllers.nodeController));

    router.get(
        "/user/node",
        [passNodeData, AuthorizeUser],
        controllers.nodeController.getAllUserNodes.bind(controllers.nodeController));

    router.put(
        "/user/node",
        [validator.body(UpdateNodeValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeController.addNodeAdditionalInfo.bind(controllers.nodeController));

    router.delete(
        "/user/node/:nodeId",
        [passNodeData, AuthorizeUser],
        controllers.nodeController.deleteNode.bind(controllers.nodeController));

    router.post(
        "/user/node/diskinformation",
        [validator.body(CreateNodeDiskInforamtionValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeDiskInformationController.createDiskData.bind(controllers.nodeDiskInformationController));

    router.get(
        "/user/node/diskinformation/:nodeId",
        [validator.query(FetchNodeDiskInforamtionValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeDiskInformationController.fetchNodeDiskInfo.bind(controllers.nodeDiskInformationController));

    router.post(
        "/user/node/uptime",
        [validator.body(CreateNodeUptimeValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeUptimeController.storeNodeUptime.bind(controllers.nodeUptimeController));

    router.get(
        "/user/node/uptime/:nodeId",
        [validator.query(FetchNodeUptimeValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeUptimeController.fetchNodeUptime.bind(controllers.nodeUptimeController));

    router.put(
        "/user/node/generalminerinfo",
        [validator.body(CreateGeneralMinerInfoValidationSchema), passNodeData, AuthorizeUser],
        controllers.generalMinerInfoController.updateOrCreateGeneralMinerInfo.bind(
            controllers.generalMinerInfoController));

    router.get(
        "/user/node/generalminerinfo/:nodeId",
        [passNodeData, AuthorizeUser],
        controllers.generalMinerInfoController.fetchGeneralMinerInfo.bind(controllers.generalMinerInfoController));

    router.post(
        "/user/node/miningrewards",
        [validator.body(CreateMiningRewardsValidationSchema), passNodeData, AuthorizeUser],
        controllers.miningRewardsController.storeMiningRewards.bind(controllers.miningRewardsController));

    router.get(
        "/user/node/miningrewards/:nodeId",
        [validator.query(FetchMiningRewardsValidationSchema), passNodeData, AuthorizeUser],
        controllers.miningRewardsController.fetchMiningRewards.bind(controllers.miningRewardsController));

    router.post(
        "/user/node/balance",
        [validator.body(CreateNodeBalanceValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodeBalanceController.storeNodeBalance.bind(controllers.nodeBalanceController));

    router.get(
        "/user/node/balance/:nodeId",
        [passNodeData, AuthorizeUser],
        controllers.nodeBalanceController.fetchNodeBalance.bind(controllers.nodeBalanceController));

    router.put(
        "/user/node/pastdeals",
        [validator.body(CreateNodePastDealsValidationSchema), passNodeData, AuthorizeUser],
        controllers.nodePastDealsController.updateOrCreatePastDeal.bind(controllers.nodePastDealsController));

    router.post(
        "/user/register",
        validator.body(UserValidationSchema),
        controllers.userController.registerUser.bind(controllers.userController));

    router.post(
        "/user/login",
        validator.body(UserValidationSchema),
        controllers.userController.loginUser.bind(controllers.userController));

    router.post(
        "/user/daemon/login",
        validator.body(UserValidationSchema),
        controllers.userController.loginUserDaemonApp.bind(controllers.userController));

    return router;
}

import bodyParser from "body-parser";
import express from "express";
import {Application, Request, RequestHandler, Response, Router} from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import {createValidator} from "express-joi-validation";

import config from "./Config/Config";
import {NodeController} from "./Controller/Api/NodeController";
import {NodeDiskInformationController} from "./Controller/Api/NodeDiskInformationController";
import {NodeUptimeController} from "./Controller/Api/NodeUptimeController";
import {NodeGeneralInfoController} from "./Controller/Api/NodeGeneralInfoController";
import {MiningRewardsController} from "./Controller/Api/MiningRewardsController";
import {NodeBalanceController} from "./Controller/Api/NodeBalanceController";
import {UserController} from "./Controller/Api/UserController";
import {createApiRoutes} from "./Routes/Api";
import {Service} from "./Services/interface";
import logger, {morganLogger} from "./Services/Logger";
import {NodeService} from "./Services/NodeService";
import {NodeDiskInformationService} from "./Services/NodeDiskInformationService";
import {NodeUptimeService} from "./Services/NodeUptimeService";
import {NodeGeneralInfoService} from "./Services/NodeGeneralInfoService";
import {MiningRewardsService} from "./Services/MiningRewardsService";
import {NodeBalanceService} from "./Services/NodeBalanceService";
import {UserService} from "./Services/UserService";
import {validateJoiError} from "./Middleware/ValidationErrorHandling";
import {SchedulingService} from "./Scheduler/SchedulingService";
import {NodeUptimeNotificationService} from "./Services/NodeUptimeNotificationService";

export class App implements Service {

    public express: Application;
    public server?: http.Server;

    private nodeController: NodeController;
    private nodeService: NodeService;

    private nodeUptimeController: NodeUptimeController;
    private nodeUptimeService: NodeUptimeService;

    private nodeDiskInformationController: NodeDiskInformationController;
    private nodeDiskInformationService: NodeDiskInformationService;

    private userController: UserController;
    private userService: UserService;

    private nodeGeneralInfoController: NodeGeneralInfoController;
    private nodeGeneralInfoService: NodeGeneralInfoService;

    private miningRewardsController: MiningRewardsController;
    private miningRewardsService: MiningRewardsService;

    private nodeBalanceController: NodeBalanceController;
    private nodeBalanceService: NodeBalanceService;

    private nodeUptimeNotificationService: NodeUptimeNotificationService;
    private schedulingService: SchedulingService;

    constructor() {
        this.express = express();
        // add before route middleware's here
        this.express.use(morgan("short", {stream: morganLogger}) as RequestHandler);
        this.express.use(bodyParser.json());
        this.express.use(helmet() as RequestHandler);
        // add after route middleware's here
        this.addInitialRoutes();
        this.nodeService = new NodeService();
        this.nodeDiskInformationService = new NodeDiskInformationService();
        this.nodeUptimeService = new NodeUptimeService();
        this.miningRewardsService = new MiningRewardsService();
        this.userService = new UserService();
        this.nodeGeneralInfoService = new NodeGeneralInfoService();
        this.nodeBalanceService = new NodeBalanceService();
        this.nodeUptimeNotificationService = new NodeUptimeNotificationService();
        // initialize scheduling service
        this.schedulingService = new SchedulingService();
    }

    public async start(): Promise<void> {
        try {
            this.server = this.express.listen(config.port);
            logger.info(`Server is listening on ${config.port}`);
            this.initControllers();
            this.addApiRoutes();
            this.schedulingService.startScheduledTasks();
        } catch (e) {
            logger.error(`App failed to start. Reason: ${e.message}`);
        }
    }

    public async stop(): Promise<void> {
        logger.info("Server shutting down");
        if (this.server) {
            await this.server.close();
        }
        this.schedulingService.stopScheduledTasks();
    }

    private initControllers(): void {
        this.nodeController = new NodeController(
            this.nodeService
        );
        this.nodeDiskInformationController = new NodeDiskInformationController(
            this.nodeDiskInformationService
        );
        this.nodeUptimeController = new NodeUptimeController(
            this.nodeUptimeService, this.nodeUptimeNotificationService
        );
        this.miningRewardsController = new MiningRewardsController(
            this.miningRewardsService
        );
        this.userController = new UserController(
            this.userService
        );
        this.nodeGeneralInfoController = new NodeGeneralInfoController(
            this.nodeGeneralInfoService
        );
        this.nodeBalanceController = new NodeBalanceController(
            this.nodeBalanceService
        );
    }

    private addInitialRoutes(): void {
        const router = Router();
        router.get("/", (req: Request, res: Response) => {
            res.json({
                message: "Welcome stranger!",
            });
        });
        router.get("/health", (req: Request, res: Response) => {
            return res.json({
                status: "OK",
            });
        });
        this.express.use("/", router);
    }

    private addApiRoutes(): void {
        const validator = createValidator({passError: true});
        this.express.use("/api", createApiRoutes(
            validator,
            this.nodeController,
            this.nodeDiskInformationController,
            this.nodeUptimeController,
            this.userController,
            this.nodeGeneralInfoController,
            this.miningRewardsController,
            this.nodeBalanceController
        ));

        this.express.use(validateJoiError);
    }
}

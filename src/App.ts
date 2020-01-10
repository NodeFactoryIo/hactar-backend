import bodyParser from "body-parser";
import express from "express";
import {Application, Request, RequestHandler, Response, Router} from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import {createValidator} from "express-joi-validation";

import config from "./Config/Config";
import {NodeController} from "./Controller/Api/NodeController";
import {DiskInformationController} from "./Controller/Api/DiskInformationController";
import {NodeUptimeController} from "./Controller/Api/NodeUptimeController";
import {createApiRoutes} from "./Routes/Api";
import {Service} from "./Services/interface";
import logger, {morganLogger} from "./Services/Logger";
import {NodeService} from "./Services/NodeService";
import {DiskInformationService} from "./Services/DiskInformationService";
import {NodeUptimeService} from "./Services/NodeUptimeService";
import {validateJoiError} from "./Middleware/ValidationErrorHandling";

export class App implements Service {

    public express: Application;
    public server?: http.Server;

    private nodeController: NodeController;
    private nodeService: NodeService;
    private nodeUptimeController: NodeUptimeController;

    private diskInformationController: DiskInformationController;
    private diskInformationService: DiskInformationService;
    private nodeUptimeService: NodeUptimeService;

    constructor() {
        this.express = express();
        // add before route middleware's here
        this.express.use(morgan("short", {stream: morganLogger}) as RequestHandler);
        this.express.use(bodyParser.json());
        this.express.use(helmet() as RequestHandler);
        // add after route middleware's here
        this.addInitialRoutes();
        this.nodeService = new NodeService();
        this.diskInformationService = new DiskInformationService();
        this.nodeUptimeService = new NodeUptimeService();
    }

    public async start(): Promise<void> {
        try {
            this.server = this.express.listen(config.port);
            logger.info(`Server is listening on ${config.port}`);
            this.initControllers();
            this.addApiRoutes();
        } catch (e) {
            logger.error(`App failed to start. Reason: ${e.message}`);
        }
    }

    public async stop(): Promise<void> {
        logger.info("Server shutting down");
        if (this.server) {
            await this.server.close();
        }
    }

    private initControllers(): void {
        this.nodeController = new NodeController(this.nodeService);
        this.diskInformationController = new DiskInformationController(this.diskInformationService);
        this.nodeUptimeController = new NodeUptimeController(this.nodeUptimeService);
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
            this.diskInformationController,
            this.nodeUptimeController
        ));

        this.express.use(validateJoiError);
    }
}

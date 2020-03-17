import bodyParser from "body-parser";
import express, {Application, Request, RequestHandler, Response, Router} from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import {createValidator} from "express-joi-validation";
import cors from "cors";

import config from "./Config/Config";
import {createApiRoutes} from "./Routes/Api";
import {Service} from "./Services/interface";
import logger, {morganLogger} from "./Services/Logger";
import {validateJoiError} from "./Middleware/ValidationErrorHandling";
import {Services} from "./Services";
import {Controllers} from "./Controllers";

export class App implements Service {

    public express: Application;
    public server?: http.Server;

    private readonly services: Services;
    private readonly controllers: Controllers;

    constructor() {
        this.express = express();
        // add before route middleware's here
        this.express.use(morgan("short", {stream: morganLogger}) as RequestHandler);
        this.express.use(bodyParser.json());
        this.express.use(helmet() as RequestHandler);
        // add after route middleware's here
        this.addInitialRoutes();
        this.services = new Services();
        this.controllers = new Controllers(this.services);
    }

    public async start(): Promise<void> {
        try {
            this.server = this.express.listen(config.port);
            logger.info(`Server is listening on ${config.port}`);
            this.addApiRoutes();
            await this.services.schedulingService.startScheduledTasks();
        } catch (e) {
            logger.error(`App failed to start. Reason: ${e.message}`);
        }
    }

    public async stop(): Promise<void> {
        logger.info("Server shutting down");
        if (this.server) {
            await this.server.close();
        }
        this.services.schedulingService.stopScheduledTasks();
    }

    private addInitialRoutes(): void {
        const router = Router();
        if (config.env === "dev") {
            router.use(cors() as any);
        } else {
            router.use(cors({
                origin: "https://analytics.hactar.app"
            }) as any);
        }

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
            this.controllers
        ));

        this.express.use(validateJoiError);
    }
}

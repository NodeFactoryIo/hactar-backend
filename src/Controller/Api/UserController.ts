import {Request, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import logger from "../../Services/Logger";
import {UserService} from "../../Services/UserService";
import {UserRequestSchema} from "./UserControllerValidation";
import {ServiceError} from "../../Services/ServiceError";

export class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async registerUser(req: ValidatedRequest<UserRequestSchema>, res: Response) {
        try {
            const {email, password} = req.body;
            const result = await this.userService.registerUser(email, password);
            if (result) {
                res.status(201).json(result)
            }
        } catch (e) {
            if (e instanceof ServiceError) {
                res.status(e.status).json({error: e.message});
            } else {
                logger.error(`Error occurred on registering user in controller: ${e.message}`);
                res.status(500).json({error: "An unknown error occurred."});
            }
        }
    }

    public async loginUser(req: ValidatedRequest<UserRequestSchema>, res: Response) {
        try {
            const {email, password} = req.body;
            const result = await this.userService.authenticateUser(email, password);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            if (e instanceof ServiceError) {
                res.status(e.status).json({error: e.message});
            } else {
                logger.error(`Error occurred on authorizing user in controller: ${e.message}`);
                res.status(500).json({error: "An unknown error occurred."});
            }
        }
    }

    public async loginUserDaemonApp(req: ValidatedRequest<UserRequestSchema>, res: Response) {
        try {
            const {email, password} = req.body;
            const result = await this.userService.authenticateUserDaemonApp(email, password);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            if (e instanceof ServiceError) {
                res.status(e.status).json({error: e.message});
            } else {
                logger.error(`Error occurred on authorizing user daemon app in controller: ${e.message}`);
                res.status(500).json({error: "An unknown error occurred."});
            }
        }
    }

    public async updateUserAccount(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const userId = res.locals.userId;
            const result = await this.userService.updateAccount(userId, email, password);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            logger.error(`Error occurred on updating user email/password in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

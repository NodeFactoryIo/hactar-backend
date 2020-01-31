import {Response} from "express";
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
                res.status(500).json({error: "An uknown error occurred."});
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
                res.status(500).json({error: "An uknown error occurred."});
            }
        }
    }

    public async loginUserDeamonApp(req: ValidatedRequest<UserRequestSchema>, res: Response) {
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
                res.status(500).json({error: "An uknown error occurred."});
            }
        }
    }
}

import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";
import * as bcrypt from "bcryptjs";

import {UserService} from "../../Services/UserService";
import logger from "../../Services/Logger";
import {CreateUserRequestSchema} from "./UserControllerValidation";

export class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async registerUser(req: ValidatedRequest<CreateUserRequestSchema>, res: Response) {
        try {
            const {email, password} = req.body;
            const user = await this.userService.getUserByEmail(email);
            if (user) {
                res.status(409).json({error: "There is already a user with this email address."})
            } else {
                const hashPassword = bcrypt.hashSync(password, 10);
                const result = await this.userService.registerUser(email, hashPassword);
                res.status(201).json(result)
            }
        } catch (e) {
            logger.error(`Error occurred on creating user in controller: ${e.message}`);
            res.status(500).json({error: "An uknown error occurred."});
        }
    }
}

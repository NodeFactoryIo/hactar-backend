import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import logger from "../../Services/Logger";
import config from "../../Config/Config";
import {UserService} from "../../Services/UserService";
import {UserRequestSchema} from "./UserControllerValidation";

export class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async registerUser(req: ValidatedRequest<UserRequestSchema>, res: Response) {
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

    public async loginUser(req: ValidatedRequest<UserRequestSchema>, res: Response) {
        try {
            const {email, password} = req.body;
            const user = await this.userService.getUserByEmail(email);
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user['hash_password']);
                if (!isValidPassword) {
                    res.status(401).json({error: "Unauthorized user."});
                } else {
                    const token = jwt.sign(user, config.jwtKey, {expiresIn: 86400});
                    res.status(200).json({token: token})
                }
            } else {
                res.status(404).json({error: "User not found."});
            }
        } catch (e) {
            logger.error(`Error occurred on authorizing user in controller: ${e.message}`);
            res.status(500).json({error: "An uknown error occurred."});

        }
    }
}

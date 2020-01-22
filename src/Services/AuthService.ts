import * as jwt from "jsonwebtoken";
import {ServiceError} from "./ServiceError";
import {JwtPayload} from "../Types/JwtPayloadType";
import {NodeService} from "./NodeService";
import config from "../Config/Config";

export class AuthService {

    public async authorizerUser(token: string) {
        const authorizedUser = await jwt.verify(token, config.jwtKey);
        if (authorizedUser) {
            const userNodes = await NodeService.getAllNodes((authorizedUser as JwtPayload).id);
            if (userNodes.length !== 0) {
                return userNodes;
            }
            throw new ServiceError(404, "No nodes found for the provided user.")
        }
        throw new ServiceError(403, "Unauthorized user.")
    }
}

import express from "express";
import config from "../Config/Config";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "../Types/JwtPayloadType";
import logger from "../Services/Logger";
import {ServiceError} from "../Services/ServiceError";


export async function AuthorizeUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = (req.headers.authorization || req.headers.Authorization) as string;
        const authorizedUser = await jwt.verify(token, config.jwtKey) as JwtPayload;
        if (res.locals.node && authorizedUser.id !== res.locals.node['userId']) {
            throw new ServiceError(403, 'Unauthorized user.')
        }
        res.locals.userId = authorizedUser.id;
        next();
    } catch (e) {
        logger.error(`${e.name}: ${e.message}`);
        res.status(403).json({error: 'Unauthorized user.'})
    }
}

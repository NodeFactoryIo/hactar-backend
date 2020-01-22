import express from "express";

import config from "../Config/Config";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "../Types/JwtPayloadType";
import logger from "../Services/Logger";

export async function AuthorizeUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = (req.headers.authorization || req.headers.Authorization) as string;
        const authorizedUser = await jwt.verify(token, config.jwtKey) as JwtPayload;
        if (authorizedUser) {
            res.locals.userId = authorizedUser.id;
            next();
        }
        res.status(403)
    } catch (e) {
        logger.error(`${e.name}: ${e.message}`)
    }
}

import express from "express";

import {ServiceError} from "../Services/ServiceError";
// import {JwtPayload} from "../Types/JwtPayloadType";
import config from "../Config/Config";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "../Types/JwtPayloadType";

export async function Authorize(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const token = (req.headers.authorization || req.headers.Authorization) as string;
    const authorizedUser = await jwt.verify(token, config.jwtKey) as JwtPayload;

    if (authorizedUser) {
        res.locals.userId = authorizedUser.id;
        next();
    } else {
        throw new ServiceError(403, "Unauthorized user.")
    }
}

import {ExpressJoiError} from 'express-joi-validation'
import express from "express";
import {ValidationErrorItem} from "@hapi/joi";

export function validateJoiError(
    err: any | ExpressJoiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    if (err && err.error && err.error.isJoi) {
        const allErrors = err.error.details.map((failed: ValidationErrorItem) => ({
            message: failed.message,
            name: failed.context ? failed.context.key : failed.path,
        }));

        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            errors: allErrors,
        });
    } else {
        // pass on to another error handler
        next(err);
    }
}

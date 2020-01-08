import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {DiskInformationService} from "../../Services/DiskInformationService";
import logger from "../../Services/Logger";
import {CreateDiskInforamtionRequestSchema} from "./DiskInformationControllerValidation";


export class DiskInformationController {

    private diskInformationService: DiskInformationService;

    constructor(
        diskInformationService: DiskInformationService,
    ) {
        this.diskInformationService = diskInformationService;
    }

    public async createDiskData(
        req: ValidatedRequest<CreateDiskInforamtionRequestSchema>,
        res: Response): Promise<any> {
        try {
            const {freeSpace, takenSpace} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.diskInformationService.createDiskData(freeSpace, takenSpace, nodeId);
            res.status(201).json(result);
        } catch (e) {
            console.log(e);
            logger.error(`Error occured on storing disk data in controller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

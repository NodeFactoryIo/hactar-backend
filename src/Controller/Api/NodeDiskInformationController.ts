import {Request, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import {NodeDiskInformationService} from "../../Services/NodeDiskInformationService";
import logger from "../../Services/Logger";
import {CreateNodeDiskInformationRequestSchema} from "./NodeDiskInformationControllerValidation";


export class NodeDiskInformationController {

    private nodeDiskInformationService: NodeDiskInformationService;

    constructor(
        nodeDiskInformationService: NodeDiskInformationService,
    ) {
        this.nodeDiskInformationService = nodeDiskInformationService;
    }

    public async createDiskData(
        req: ValidatedRequest<CreateNodeDiskInformationRequestSchema>,
        res: Response): Promise<any> {
        try {
            const {freeSpace, takenSpace} = req.body;
            const nodeId = res.locals.node.id;
            const result = await this.nodeDiskInformationService.createDiskData(freeSpace, takenSpace, nodeId);
            res.status(201).json(result);
        } catch (e) {
            logger.error(`Error occured on storing disk data in controller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }

    public async fetchNodeDiskInfo(req: Request, res: Response) {
        try {
            const {nodeId} = req.params;
            const result = await this.nodeDiskInformationService.fetchDiskInfo(nodeId);
            if (result) {
                res.status(200).json(result)
            }
        } catch (e) {
            logger.error(`Error occurred on fetching node disk information in controller: ${e.message}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

import {Response} from "express";
import {ValidatedRequest} from "express-joi-validation";

import logger from "../../Services/Logger";
import {MiningRewardsService} from "../../Services/MiningRewardsService";
import {CreateMiningRewardsRequestSchema} from "./MiningRewardsControllerValidation";

export class MiningRewardsController {

    private miningRewardsService: MiningRewardsService

    constructor(miningRewardsService: MiningRewardsService) {
        this.miningRewardsService = miningRewardsService;
    }

    public async storeMiningRewards(req: ValidatedRequest<CreateMiningRewardsRequestSchema>, res: Response) {
        try {
            const result = await this.miningRewardsService.storeMiningRewards(res.locals.miningRewards);
            res.status(201).json({"Inserted records": result[1]});
        } catch (e) {
            console.log('error', e)
            logger.error(`Error occurred on storing mining rewards in controller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

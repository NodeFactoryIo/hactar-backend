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
            const rewards = req.body;
            const result = await this.miningRewardsService.storeMiningRewards(res.locals.nodes, rewards);
            res.status(201).json(result);
        } catch (e) {
            logger.error(`Error occurred on storing mining rewards in controller: ${e}`);
            res.status(500).json({error: "An unknown error occurred."});
        }
    }
}

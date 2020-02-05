import sequelize from "./Database";
import {MiningReward} from "../Types/MiningRewardType";
import config from "../Config/Config";

export class MiningRewardsService {

    public async storeMiningRewards(miningRewards: Array<MiningReward>) {
        return await sequelize.sequelize.query(
            `INSERT INTO public."MiningRewards"
                VALUES (DEFAULT, array[:miningRewards]::json[], :rewardAmount,
                current_timestamp, current_timestamp);`,
            {
                replacements: {
                    miningRewards: miningRewards
                        // stringifying every object in the array because of Postgres array format
                        .map(mr => JSON.stringify(mr)),
                    rewardAmount: config.rewardAmount,
                },
            }
        ) as unknown as Array<MiningReward>;
    }
}

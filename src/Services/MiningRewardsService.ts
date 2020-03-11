import logger from "./Logger";
import datebase from "./Database";
import {QueryTypes} from "sequelize";

import {Node} from "../Models/Node";
import {MiningReward} from "../Models/MiningReward";
import {MiningRewardInput} from "../Types/MiningRewardInputType";

export class MiningRewardsService {

    public async storeMiningRewards(nodes: Array<Node>, rewards: Array<MiningRewardInput>) {
        nodes.map(
            async (node: Node, index) => {
                const nodeToSave = {
                    cid: rewards[index].cid,
                    rewardAmount: rewards[index].reward,
                    nodeId: node.id,
                };
                try {
                    return await MiningReward.create(nodeToSave)
                } catch (e) {
                    logger.error(`Error occurred on storing mining rewards: ${e}`);
                }
            }
        )
    }

    public async fetchMiningRewards(nodeId: number, filter: string) {
        return await datebase.runQuery<MiningReward>(
            `select date_trunc(:period, "updatedAt") "timePeriod", sum("rewardAmount") "rewardSum"
            from "MiningRewards"
            where "nodeId" = :nodeId
            and "updatedAt" >= now() - interval :filter
            group by date_trunc(:period, "updatedAt")
            order by "timePeriod" desc;`,
            {
                replacements: {
                    filter: `1 ${filter}`,
                    nodeId: nodeId,
                    period: filter == "day" ? "hour" : "day"
                },
                type: QueryTypes.SELECT,

            });
    }
}

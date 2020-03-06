import logger from "./Logger";
import * as moment from "moment";
import {unitOfTime} from "moment";
import {Op} from "sequelize";

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
        return await MiningReward.findAll({
            raw: true,
            where: {
                nodeId,
                updatedAt: {
                    [Op.gte]:
                        moment.utc().subtract(1, filter as unitOfTime.Base).format("YYYY-MM-DD HH:MM:ssZZ")
                }
            },
            order: [['updatedAt', 'DESC']]
        });
    }
}

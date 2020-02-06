import {MiningReward} from "../Models/MiningReward";
import config from "../Config/Config";
import {Node} from "../Models/Node";
import {MiningRewardInput} from "../Types/MiningRewardInputType";
import logger from "./Logger";

export class MiningRewardsService {

    public async storeMiningRewards(nodes: Array<Node>, rewards: Array<MiningRewardInput>) {
        nodes.map(
            async (node: Node, index) => {
                const nodeToSave = {
                    cid: rewards[index].cid,
                    rewardAmount: config.rewardAmount,
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
}

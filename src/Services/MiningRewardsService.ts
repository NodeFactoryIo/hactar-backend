import {MiningReward} from "../Models/MiningReward";
import config from "../Config/Config";
import {Node} from "../Models/Node";
import {MiningRewardInput} from "../Types/MiningRewardType";

export class MiningRewardsService {

    public async storeMiningRewards(nodes: Array<Node>, rewards: Array<MiningRewardInput>) {
        return await Promise.all(nodes.map(
            (node: Node, index) => (
                {
                    cid: rewards[index].cid,
                    rewardAmount: config.rewardAmount,
                    nodeId: node.id,
                }
            )
        ).map(async (node) => {
            return await MiningReward.create(node);
        }))
    }
}

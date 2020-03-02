import {NodePastDeal, NodePastDealModel} from "../Models/NodePastDealModel";
import {Node} from "../Models/Node";

export class NodePastDealsService {

    public async replacePastDealsForNode(pastDeals: NodePastDeal[], nodeId: number) {
        await NodePastDealModel.destroy({where: {nodeId}});
        return await NodePastDealModel.bulkCreate(pastDeals);
    }

    public async updateOrCreatePastDeal(
        cid: string, state: number, size: string, provider: string, price: string, duration: number, nodeId: number) {
        const pastDeal = await NodePastDealModel.findOne({
            raw: true,
            where: {
                nodeId
            }
        });
        if (pastDeal) {
            const updatedPastDeal = await NodePastDealModel.update(
                {cid, state, size, provider, price, duration, nodeId},
                {
                    where: {
                        nodeId
                    },
                    returning: true,
                })
            return await updatedPastDeal[1][0]; // returns the updated object, without updates count
        }
        return await NodePastDealModel.create({cid, state, size, provider, price, duration, nodeId});
    }

    public async fetchNodePastDeals(userId: number, from: number, to: number, orderBy: string) {
        return await NodePastDealModel.findAll({
            attributes: ['id', 'cid', 'state', 'size', 'provider',
                'price', 'duration', 'createdAt', 'updatedAt'],
            include: [{
                attributes: [],
                model: Node,
                where: {
                    userId
                }
            }],
            raw: true,
            limit: (to - from),
            offset: from,
            order: [['updatedAt', orderBy]]
        })
    }
}

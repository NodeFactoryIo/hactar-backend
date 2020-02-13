import {NodePastDeal} from "../Models/NodePastDeal";

export class NodePastDealsService {

    public async updateOrCreatePastDeal(
        cid: string, state: number, size: string, provider: string, price: string, duration: number, nodeId: number) {
        const pastDeal = await NodePastDeal.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
        if (pastDeal) {
            const updatedPastDeal = await NodePastDeal.update({cid, state, size, provider, price, duration, nodeId},
                {
                    where: {
                        nodeId
                    },
                    returning: true,
                })
            return await updatedPastDeal[1]; // returns the updated object, without updates count
        }
        return await NodePastDeal.create({cid, state, size, provider, price, duration, nodeId});
    }
}

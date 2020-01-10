import {NodeUptime} from "../Models/NodeUptime";
import {Node} from "../Models/Node";

export class NodeUptimeService {

    public async createNodeUptime(isWorking: boolean, nodeId: number) {
        return await NodeUptime.create({
            isWorking,
            nodeId
        });
    }
    public async getNodeUpTimeByPk(nodeId: number) {
        return await Node.findByPk(nodeId, {raw: true, include: [{model: NodeUptime}]});
    }
}

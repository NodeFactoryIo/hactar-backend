import {NodeUptime} from "../Models/NodeUptime";
import {Node} from "../Models/Node";

export class NodeUptimeService {

    public async getNodeUpTimeByPk(nodeId: number) {
        return await Node.findByPk(nodeId, {raw: true, include: [{model: NodeUptime}]});
    }

    public async createNodeUptime(isWorking: boolean, nodeId: number): Promise<NodeUptime> {
        return NodeUptime.create({
            isWorking,
            nodeId
        });
    }
}

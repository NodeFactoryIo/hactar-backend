import {NodeStatus} from "../Models/NodeStatus";

export class NodeStatusService {
    public async storeNodeStatus(nodeId: number, isUp: boolean, isReported: boolean): Promise<NodeStatus> {
        return await NodeStatus.create({
            nodeId,
            isUp,
            isReported
        });
    }

    public async getNodeStatusByNodeId(nodeId: number): Promise<NodeStatus|null> {
        return await NodeStatus.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
    }

    public async updateNodeStatus(nodeId: number, isUp: boolean, isReported: boolean): Promise<[number, NodeStatus[]]> {
        return await NodeStatus.update({
            nodeId,
            isUp,
            isReported
        }, {
            where: {
                nodeId,
            },
            returning: true
        });
    }
}
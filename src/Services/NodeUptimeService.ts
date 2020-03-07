import * as moment from "moment";
import {unitOfTime} from "moment";
import {Op} from "sequelize";

import {NodeUptime} from "../Models/NodeUptime";

export class NodeUptimeService {

    public async createNodeUptime(isWorking: boolean, nodeId: number): Promise<NodeUptime> {
        return NodeUptime.create({
            isWorking,
            nodeId
        });
    }

    public async fetchNodeUptime(nodeId: number, filter: string) {
        return await NodeUptime.findAll({
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

    public async fetchLatestNodeUptime(nodeId: number) {
        return await NodeUptime.findOne({
            raw: true,
            where: {
                nodeId,
            },
            order: [['updatedAt', 'DESC']]
        })
    }
}

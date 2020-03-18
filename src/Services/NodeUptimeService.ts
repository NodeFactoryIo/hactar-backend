import {QueryTypes} from "sequelize";
import database from "../Services/Database";
import {NodeUptime} from "../Models/NodeUptime";

export class NodeUptimeService {

    public async createNodeUptime(isWorking: boolean, nodeId: number): Promise<NodeUptime> {
        return NodeUptime.create({
            isWorking,
            nodeId
        });
    }

    public async fetchNodeUptime(nodeId: number, filter: string) {
        return await database.runQuery<NodeUptime>(
            `select "isWorking",date_trunc('day', "updatedAt") "timePeriod", (
                case when "isWorking" = false
                then 'Node is down'
                else 'Node is up'
                end) as "nodeStatus"
                    from "NodeUptime"
                    where "nodeId" = 1
                    and "updatedAt" >= now() - interval '1 year'
                    group by date_trunc('day', "updatedAt"), "isWorking"
                    order by "timePeriod" desc;`,
            {
                replacements: {
                    filter: `1 ${filter}`,
                    nodeId: nodeId,
                    period: filter == "day" ? "hour" : "day"
                },
                type: QueryTypes.SELECT
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

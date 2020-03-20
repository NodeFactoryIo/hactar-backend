import database from "../Services/Database";
import {NodeUptime} from "../Models/NodeUptime";
import {filtersSelectQuery} from "../Utils/filterSelectQueryConfig";

export class NodeUptimeService {

    public async createNodeUptime(isWorking: boolean, nodeId: number): Promise<NodeUptime> {
        return NodeUptime.create({
            isWorking,
            nodeId
        });
    }

    public async fetchNodeUptime(nodeId: number, filter: string) {
        return await database.runQuery<NodeUptime>(
            `select *
            from "NodeUptime"
                where(date_trunc(:period, "updatedAt"), "updatedAt") in
                (select date_trunc(:period, "updatedAt"), max("updatedAt")
            from "NodeUptime"
            where "nodeId" = :nodeId
            group by date_trunc(:period, "updatedAt")
                )
            and "updatedAt" >= now() - interval :filter
            order by "updatedAt" desc;`,
            filtersSelectQuery(nodeId, filter));

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

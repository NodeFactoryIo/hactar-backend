import database from "../Services/Database";
import {QueryTypes} from "sequelize";
import {NodeDiskInformation} from "../Models/NodeDiskInformation";

export class NodeDiskInformationService {

    public async createDiskData(freeSpace: string, takenSpace: string, nodeId: number) {
        return await NodeDiskInformation.create({
            freeSpace,
            takenSpace,
            nodeId
        });
    }

    public async fetchDiskInfo(nodeId: number, filter: string) {
        return await database.runQuery<NodeDiskInformation>(
            `select *
            from "NodeDiskInformation"
                where(date_trunc(:period, "updatedAt"), "updatedAt") in
                (select date_trunc(:period, "updatedAt"), max("updatedAt")
            from "NodeDiskInformation"
            where "nodeId" = :nodeId
            group by date_trunc(:period, "updatedAt")
                )
            and "updatedAt" >= now() - interval :filter
            order by "updatedAt" desc;`,
            {
                replacements: {
                    filter: `1 ${filter}`,
                    nodeId: nodeId,
                    period: filter == "day" ? "hour" : "day"
                },
                type: QueryTypes.SELECT
            });
    }

    public async fetchLatestDiskInfo(nodeId: number): Promise<NodeDiskInformation|null> {
        return await NodeDiskInformation.findOne({
            raw: true,
            where: {
                nodeId,
            },
            order: [['updatedAt', 'DESC']]
        })
    }
}

import {Task} from "./interface";
import {NodeUptimeNotificationService} from "../../Services/NodeUptimeNotificationService";
import database from "../../Services/Database";
import {NodeUptime} from "../../Models/NodeUptime";
import {QueryTypes} from "sequelize";
import logger from "../../Services/Logger";

export class UptimeNotificationTask implements Task {

    private uptimeNotificationService: NodeUptimeNotificationService;

    constructor(uptimeNotificationService: NodeUptimeNotificationService) {
        this.uptimeNotificationService = uptimeNotificationService;
    }

    async start(): Promise<void> {
        const nodes = await this.findAllNotWorkingNodes();
        if (nodes != null) {
            nodes.forEach(nodeUptime => this.uptimeNotificationService.processNodeUptime(nodeUptime));
        }
    }

    private async findAllNotWorkingNodes(): Promise<NodeUptime[] | null> {
        try {
            // select, from table of latest uptime records for each node,
            // entries that are older than 1 hour or are entries in last hour that reported node is down
            return await database.runQuery<NodeUptime>(
                "select NU.*\n" +
                "from (\n" +
                "         select \"nodeId\", max(\"createdAt\") as lastUptimeReported\n" +
                "         from \"NodeUptime\"\n" +
                "         group by \"nodeId\"\n" +
                ") as latest_uptimes\n" +
                "left outer join \"NodeUptime\" NU\n" +
                "    on NU.\"nodeId\" = latest_uptimes.\"nodeId\" and\n" +
                "       NU.\"createdAt\" = lastUptimeReported\n" +
                "where lastUptimeReported < now() - interval '1 HOUR' or\n" +
                "      (lastUptimeReported > now() - interval '1 HOUR' and NU.\"isWorking\" = false)",
                {type: QueryTypes.SELECT})
        } catch (e) {
            logger.error("Failed to find not working nodes in database", e)
        }
        return null;
    }
}
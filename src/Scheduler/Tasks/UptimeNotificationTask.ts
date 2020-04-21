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
        logger.info("Starting UptimeNotification task...");
        const nodes = await this.findAllNotWorkingNodes();
        if (nodes != null) {
            logger.info(`Found ${nodes.length} number of nodes that are not working.`);
            nodes.forEach(nodeUptime => this.uptimeNotificationService.processNodeUptime(nodeUptime));
        } else {
            logger.warn("findAllNotWorkingNodes returned null.");
        }
    }

    private async findAllNotWorkingNodes(): Promise<NodeUptime[] | null> {
        try {
            // select, from table of latest uptime records for each node,
            // entries that are older than 1 hour or are entries in last hour that reported node is down
            return await database.runQuery<NodeUptime>(
                `select "id", "createdAt", "updatedAt", Nu."nodeId",
                        case WHEN ("isWorking" = true and "updatedAt" > now() - interval '16 minutes') then true
                        else false
                end as "isWorking"
                from (
                    select "nodeId", max("createdAt") as "lastUptimeReported"
                    from "NodeUptime"
                    group by "nodeId"
                    ) as "latest_uptimes"
                left outer join "NodeUptime" NU on
                    NU."nodeId" = latest_uptimes."nodeId" and
                    NU."createdAt" = "lastUptimeReported"
                where "lastUptimeReported" < now() - interval '16 minutes' or
                    ("lastUptimeReported" > now() - interval '1 hour' and NU."isWorking" = false);`,
                {type: QueryTypes.SELECT})
        } catch (e) {
            logger.error("Failed to find not working nodes in database", e)
        }
        return null;
    }
}
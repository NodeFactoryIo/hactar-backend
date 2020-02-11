import {Task} from "./interface";
import {UptimeNotificationService} from "../../Services/UptimeNotificationService";
import logger from "../../Services/Logger";
import {NodeUptime} from "../../Models/NodeUptime";
import sequelize from "sequelize";

export class UptimeNotificationTask implements Task {

    private uptimeNotificationService: UptimeNotificationService;

    constructor() {
        this.uptimeNotificationService = new UptimeNotificationService();
    }

    async start(): Promise<void> {
        // find all that didnt report in last hour or reported not working
        try {
            const all = await NodeUptime.findAll({
                attributes: [[sequelize.fn('max', sequelize.col('createdAt')), 'lastUptimeReport']],
                include: [{model: NodeUptime}],
                group: ['NodeUptime.nodeId'],
                raw: true,
                order: sequelize.literal('total DESC')
            });
            logger.info("Task");
            logger.info(all);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
        }

        // this.uptimeNotificationService.sendUptimeNotification();
    }
}
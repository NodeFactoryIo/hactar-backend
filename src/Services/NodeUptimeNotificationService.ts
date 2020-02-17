import {NodeUptime} from "../Models/NodeUptime";
import {EmailService} from "./EmailService";
import logger from "./Logger";
import {UserService} from "./UserService";
import {NodeService} from "./NodeService";
import {NodeStatusService} from "./NodeStatusService";
import config from "../Config/Config";


export class NodeUptimeNotificationService {

    private emailService: EmailService;
    private userService: UserService;
    private nodeService: NodeService;
    private nodeStatusService: NodeStatusService;

    constructor(
        emailService: EmailService,
        userService: UserService,
        nodeService: NodeService,
        nodeStatusService: NodeStatusService
    ) {
        this.emailService = emailService;
        this.userService = userService;
        this.nodeService = nodeService;
        this.nodeStatusService = nodeStatusService
    }

    public async processNodeUptime(nodeUptime: NodeUptime): Promise<void> {
        // check if node status already created for node
        const currentNodeStatus = await this.nodeStatusService.getNodeStatusByNodeId(nodeUptime.nodeId);
        const newNodeStatus = {nodeId: nodeUptime.nodeId, isUp: nodeUptime.isWorking, isReported: true};
        if (currentNodeStatus != null) {
            if (!nodeUptime.isWorking) {
                // send email notification if current node was up until now or was down but report wasn't sent
                if (currentNodeStatus.isUp || (!currentNodeStatus.isUp && !currentNodeStatus.isReported)) {
                    await this.sendUptimeNotification(nodeUptime)
                }
            }
            // update node status if something changed
            if (currentNodeStatus.isReported != newNodeStatus.isReported
                || currentNodeStatus.isUp != newNodeStatus.isUp)
            {
                await this.nodeStatusService.updateNodeStatus(
                    nodeUptime.nodeId,
                    nodeUptime.isWorking,
                    true
                );
            }
        } else {
            // create new node status entry
            await this.nodeStatusService.storeNodeStatus(
                nodeUptime.nodeId,
                nodeUptime.isWorking,
                true
            );
            // send notification if node is down
            if (!newNodeStatus.isUp) {
                await this.sendUptimeNotification(nodeUptime);
            }
        }
    }

    private async sendUptimeNotification(uptime: NodeUptime): Promise<void> {
        const node = await this.nodeService.getNodeByPk(uptime.nodeId);
        if (node != null) {
            const user = await this.userService.getUserByPk(node.userId);
            if (user != null) {
                logger.info(`Sending mail to:${user.email} for node:${node.id}::${node.address}`);
                await this.emailService.sendEmailNotification(
                    user,
                    {NODE: node.address + node.url},
                    config.sendinblue.nodeUptimeNotifEmailTemplateId
                );
                return;
            }
            logger.error(`Failed to find user:${node.userId} for uptime entry:${uptime.id}`);
        }
        logger.error(`Failed to find node:${uptime.nodeId} for uptime entry:${uptime.id}`);
    }
}
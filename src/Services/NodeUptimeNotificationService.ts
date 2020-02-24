import {NodeUptime} from "../Models/NodeUptime";
import {EmailService} from "./EmailService";
import logger from "./Logger";
import {UserService} from "./UserService";
import {NodeService} from "./NodeService";
import {NodeStatusService} from "./NodeStatusService";
import config from "../Config/Config";
import {NodeStatus} from "../Models/NodeStatus";

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
        const newNodeStatus = {nodeId: nodeUptime.nodeId, isUp: nodeUptime.isWorking, isReported: true} as NodeStatus;
        if (currentNodeStatus != null) {
            await this.updateExistingNodeStatus(nodeUptime, newNodeStatus, currentNodeStatus);
        } else {
            await this.createNewNodeStatus(nodeUptime, newNodeStatus);
        }
    }

    private async createNewNodeStatus(
        nodeUptime: NodeUptime, newNodeStatus: NodeStatus
    ): Promise<void> {
        // create new node status entry
        await this.nodeStatusService.storeNodeStatus(
            nodeUptime.nodeId,
            nodeUptime.isWorking,
            true
        );
        // eslint-disable-next-line max-len
        logger.info(`Created new node status [isUp: ${nodeUptime.isWorking}, isReported: true] for node ${nodeUptime.nodeId}.`);
        // send notification if node is down
        if (!newNodeStatus.isUp) {
            await this.sendUptimeNotification(nodeUptime);
        }
    }

    private async updateExistingNodeStatus(
        nodeUptime: NodeUptime, newNodeStatus: NodeStatus, oldNodeStatus: NodeStatus
    ): Promise<void> {
        // if reported node is down
        if (!nodeUptime.isWorking) {
            // send email notification if current node was up until now or was down but report wasn't sent
            if (oldNodeStatus.isUp || (!oldNodeStatus.isUp && !oldNodeStatus.isReported)) {
                await this.sendUptimeNotification(nodeUptime)
            }
        }
        // update node status if something changed
        if (oldNodeStatus.isReported != newNodeStatus.isReported
            || oldNodeStatus.isUp != newNodeStatus.isUp) {
            await this.nodeStatusService.updateNodeStatus(
                nodeUptime.nodeId,
                nodeUptime.isWorking,
                true
            );
            // eslint-disable-next-line max-len
            logger.info(`Updated node status [isUp: ${nodeUptime.isWorking}, isReported: true] for node ${nodeUptime.nodeId}.`)
        }
    }

    private async sendUptimeNotification(uptime: NodeUptime): Promise<void> {
        const node = await this.nodeService.getNodeByPk(uptime.nodeId);
        if (node != null && node.notifications) {
            const user = await this.userService.getUserByPk(node.userId);
            if (user != null) {
                logger.info(`Sending mail to:${user.email} for node:${node.id}::${node.address}`);
                if (config.env != "dev") {
                    await this.emailService.sendEmailNotification(
                        user,
                        {NODE: node.address + node.url},
                        config.sendinblue.nodeUptimeNotifEmailTemplateId
                    );
                }
                return;
            }
            logger.error(`Failed to find user:${node.userId} for uptime entry:${uptime.id}`);
        }
        logger.error(`Failed to find node:${uptime.nodeId} for uptime entry:${uptime.id}`);
    }
}
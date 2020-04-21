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
        logger.info(`Processing node uptime for node ID ${nodeUptime.nodeId}`);
        // check if node status already created for node
        const currentNodeStatus = await this.nodeStatusService.getNodeStatusByNodeId(nodeUptime.nodeId);
        const newNodeStatus = {nodeId: nodeUptime.nodeId, isUp: nodeUptime.isWorking, isReported: true} as NodeStatus;
        if (currentNodeStatus != null) {
            logger.info(`Updating existing status to ${newNodeStatus.isUp} for node ID ${nodeUptime.nodeId}`);
            await this.updateExistingNodeStatus(nodeUptime, newNodeStatus, currentNodeStatus);
        } else {
            logger.info(`Creating new status (${newNodeStatus.isUp}) for node ID ${nodeUptime.nodeId}`);
            await this.createNewNodeStatus(nodeUptime, newNodeStatus);
        }
    }

    private async createNewNodeStatus(nodeUptime: NodeUptime, newNodeStatus: NodeStatus): Promise<void> {
        // create new node status entry
        await this.nodeStatusService.storeNodeStatus(
            nodeUptime.nodeId,
            nodeUptime.isWorking,
            true
        );

        logger.info(`Stored new node status (${nodeUptime.isWorking}) for node ${nodeUptime.nodeId}.`);
        // send notification if node is down
        if (!newNodeStatus.isUp) {
            logger.info(`Sending uptime notification for node ID ${nodeUptime.nodeId}`);
            await this.sendUptimeNotification(nodeUptime);
        }
    }

    private async updateExistingNodeStatus(
        nodeUptime: NodeUptime,
        newNodeStatus: NodeStatus,
        oldNodeStatus: NodeStatus,
    ): Promise<void> {
        // if reported node is down
        if (!nodeUptime.isWorking) {
            logger.info(`Node ID ${nodeUptime.nodeId} is down.`);
            // send email notification if current node was up until now or was down but report wasn't sent
            if (oldNodeStatus.isUp) {
                logger.info(`Node was online before. Going to send notification.`);
                await this.sendUptimeNotification(nodeUptime)
            } else if (!oldNodeStatus.isUp && !oldNodeStatus.isReported) {
                logger.info(`Node was offline but report wasn't sent. Going to send notification.`);
                await this.sendUptimeNotification(nodeUptime)
            }
        }

        // update node status if something changed
        if (oldNodeStatus.isReported != newNodeStatus.isReported
            || oldNodeStatus.isUp != newNodeStatus.isUp) {
            logger.info(`Found node ID ${nodeUptime.nodeId} that has old status` +
                `[isReported: ${oldNodeStatus.isReported}, isUp: ${oldNodeStatus.isUp}].`);

            await this.nodeStatusService.updateNodeStatus(
                nodeUptime.nodeId,
                nodeUptime.isWorking,
                true
            );
            // eslint-disable-next-line max-len
            logger.info(`Updated node ID ${nodeUptime.nodeId} status to [isUp: ${nodeUptime.isWorking}, isReported: true].`)
        }
    }

    private async sendUptimeNotification(uptime: NodeUptime): Promise<void> {
        const node = await this.nodeService.getNodeByPk(uptime.nodeId);
        if (node === null) {
            logger.error(`Failed to find node ID ${uptime.nodeId} for uptime entry ${uptime.id}`);
            return;
        }

        if (node.hasEnabledNotifications) {
            const user = await this.userService.getUserByPk(node.userId);
            if (user != null) {
                logger.info(`Sending mail to: ${user.email} for node: ${node.id}::${node.address}`);
                if (config.env != "dev") {
                    logger.info(`Going to send email to ${user.id}.`);
                    const nodeName = node.name ? node.name : node.id;
                    await this.emailService.sendEmailNotification(
                        user,
                        {NODE: `${nodeName} - ${node.url}`},
                        config.sendinblue.nodeUptimeNotifEmailTemplateId
                    );
                    logger.info(`Email sent to to ${user.id}.`);
                } else {
                    logger.info(`Skipping sending email notification because env is ${config.env}`);
                }
                return;
            }
            logger.error(`Failed to find user:${node.userId} for uptime entry: ${uptime.id}`);
        }
    }
}
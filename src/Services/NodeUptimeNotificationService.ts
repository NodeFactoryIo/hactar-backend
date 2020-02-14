import {NodeUptime} from "../Models/NodeUptime";
import {EmailService} from "./EmailService";
import {Node} from "../Models/Node";
import {User} from "../Models/User";
import {NodeStatus} from "../Models/NodeStatus";
import logger from "./Logger";


export class NodeUptimeNotificationService {

    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    public async processNodeUptime(nodeUptime: NodeUptime): Promise<void> {
        // check if node status already created for node
        const currentNodeStatus = await this.getNodeStatusInfo(nodeUptime.nodeId);
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
                await NodeStatus.update({
                    nodeId: nodeUptime.nodeId,
                    isUp: nodeUptime.isWorking,
                    isReported: true
                }, {
                    where: {
                        nodeId: nodeUptime.nodeId,
                    },
                    returning: true
                });
            }
        } else {
            // create new node status entry
            await NodeStatus.create({
                nodeId: nodeUptime.nodeId,
                isUp: nodeUptime.isWorking,
                isReported: true
            });
            // send notification if node is down
            if (!newNodeStatus.isUp) {
                await this.sendUptimeNotification(nodeUptime);
            }
        }
    }

    private async sendUptimeNotification(uptime: NodeUptime): Promise<void> {
        const node = await Node.findByPk(uptime.nodeId);
        if (node != null) {
            const user = await User.findByPk(node.userId);
            if (user != null) {
                logger.info(`Sending mail to:${user.email} for node:${node.id}::${node.address}`);
                await this.emailService.sendEmailNotification(
                    user,
                    {NODE: node.address + node.url}
                );
                return;
            }
            logger.error(`Failed to find user:${node.userId} for uptime entry:${uptime.id}`);
        }
        logger.error(`Failed to find node:${uptime.nodeId} for uptime entry:${uptime.id}`);
    }

    private async getNodeStatusInfo(nodeId: number): Promise<NodeStatus|null> {
        return NodeStatus.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
    }
}
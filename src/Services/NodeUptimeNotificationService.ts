import {UptimeNotification} from "../Models/UptimeNotification";
import {NodeUptime} from "../Models/NodeUptime";
import {EmailService} from "./EmailService";
import {Node} from "../Models/Node";
import {User} from "../Models/User";


export class UptimeNotificationService {

    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    public async sendUptimeNotification(uptime: NodeUptime) {
        const node = await Node.findByPk(uptime.nodeId);
        if (node != null) {
            const user = await User.findByPk(node.userId);
            if (user != null) {
                const emailSent = await this.emailService.sendEmailNotification(
                    user,
                    {NODE: node.address + node.url}
                );
            }
        }
    }


    private async createUptimeNotifications(nodeUptimeId: number): Promise<UptimeNotification> {
        return UptimeNotification.create({
            nodeUptimeId
        });
    }
}
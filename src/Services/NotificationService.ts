import {EmailService} from "./EmailService";
import {Node} from "../Models/Node";
import {User} from "../Models/User";

export class NotificationService {
    protected emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    public async sendNodeDownNotification(node: Node) {
        const user = await User.findByPk(node.userId);
        if (user != null) {
            await this.emailService.sendEmailNotification(user, 1)
        }

    }
}
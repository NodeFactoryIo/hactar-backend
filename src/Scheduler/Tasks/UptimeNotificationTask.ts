import {Task} from "./interface";
import {UptimeNotificationService} from "../../Services/UptimeNotificationService";

export class UptimeNotificationTask implements Task {

    private uptimeNotificationService: UptimeNotificationService;

    constructor() {
        this.uptimeNotificationService = new UptimeNotificationService();
    }

    start(): void {


        // this.uptimeNotificationService.sendUptimeNotification();
    }
}
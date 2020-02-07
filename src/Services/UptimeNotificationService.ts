import {UptimeNotification} from "../Models/UptimeNotification";


export class UptimeNotificationService {
    public async createUptimeNotifications(nodeUptimeId: number) {
        return UptimeNotification.create({
            nodeUptimeId
        });
    }
}
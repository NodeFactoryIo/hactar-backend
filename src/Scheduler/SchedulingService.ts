import {Job, scheduleJob} from "node-schedule"
import config from "../Config/Config";
import {UptimeNotificationTask} from "./Tasks/UptimeNotificationTask";

export class SchedulingService {

    // email uptime notification task
    private uptimeTask: UptimeNotificationTask;
    private uptimeJob: Job;

    constructor() {
        this.uptimeTask = new UptimeNotificationTask();
    }

    public startScheduledTasks(): void {
        this.uptimeJob = scheduleJob(
            config.uptimeNotificationsRecurrenceRule,
            async () => await this.uptimeTask.start()
        );
    }

    public stopScheduledTasks(): void {
        this.uptimeJob.cancel(false);
    }
}
import {Job, RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit, scheduleJob} from "node-schedule"
import {Task} from "./Tasks/interface";

export class SchedulingTask {
    public task: Task;
    public rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number;

    // eslint-disable-next-line max-len
    constructor(task: Task, rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number) {
        this.task = task;
        this.rule = rule;
    }
}

export class SchedulingService {

    private tasks: SchedulingTask[];
    private jobs: Job[];

    constructor(...tasks: SchedulingTask[]) {
        this.tasks = tasks;
    }

    public async startScheduledTasks(): Promise<void> {
        this.jobs = this.tasks.map(t => scheduleJob(
            t.rule,
            async () => await t.task.start()
        ));
    }

    public stopScheduledTasks(): void {
        this.jobs.forEach(j => j.cancel())
    }
}
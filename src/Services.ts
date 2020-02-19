import {NodeService} from "./Services/NodeService";
import {NodeUptimeService} from "./Services/NodeUptimeService";
import {NodeDiskInformationService} from "./Services/NodeDiskInformationService";
import {GeneralMinerInfoService} from "./Services/GeneralMinerInfoService";
import {UserService} from "./Services/UserService";
import {MiningRewardsService} from "./Services/MiningRewardsService";
import {NodeBalanceService} from "./Services/NodeBalanceService";
import {NodePastDealsService} from "./Services/NodePastDealsService";
import {NodeStatusService} from "./Services/NodeStatusService";
import {NodeUptimeNotificationService} from "./Services/NodeUptimeNotificationService";
import {EmailService} from "./Services/EmailService";
import {SchedulingService, SchedulingTask} from "./Scheduler/SchedulingService";
import {UptimeNotificationTask} from "./Scheduler/Tasks/UptimeNotificationTask";
import config from "./Config/Config";

export class Services {

    public nodeService: NodeService;
    public nodeUptimeService: NodeUptimeService;
    public nodeDiskInformationService: NodeDiskInformationService;
    public userService: UserService;
    public generalMinerInfoService: GeneralMinerInfoService;
    public miningRewardsService: MiningRewardsService;
    public nodeBalanceService: NodeBalanceService;
    public nodePastDealsService: NodePastDealsService;
    public nodeStatusService: NodeStatusService;
    public nodeUptimeNotificationService: NodeUptimeNotificationService;
    public emailService: EmailService;
    public schedulingService: SchedulingService;

    // services initialization
    constructor() {
        this.nodeService = new NodeService();
        this.nodeDiskInformationService = new NodeDiskInformationService();
        this.nodeUptimeService = new NodeUptimeService();
        this.miningRewardsService = new MiningRewardsService();
        this.userService = new UserService();
        this.generalMinerInfoService = new GeneralMinerInfoService();
        this.nodeBalanceService = new NodeBalanceService();
        this.nodePastDealsService = new NodePastDealsService();
        this.nodeStatusService = new NodeStatusService();
        this.emailService = new EmailService();
        this.nodeUptimeNotificationService = new NodeUptimeNotificationService(
            this.emailService,
            this.userService,
            this.nodeService,
            this.nodeStatusService
        );
        // define scheduled tasks
        this.schedulingService = new SchedulingService(
            new SchedulingTask(
                new UptimeNotificationTask(this.nodeUptimeNotificationService),
                config.uptimeNotificationsRecurrenceRule
            )
        );
    }
}

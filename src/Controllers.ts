import {NodeController} from "./Controller/Api/NodeController";
import {NodeUptimeController} from "./Controller/Api/NodeUptimeController";
import {NodeDiskInformationController} from "./Controller/Api/NodeDiskInformationController";
import {UserController} from "./Controller/Api/UserController";
import {GeneralMinerInfoController} from "./Controller/Api/GeneralMinerInfoController";
import {MiningRewardsController} from "./Controller/Api/MiningRewardsController";
import {NodeBalanceController} from "./Controller/Api/NodeBalanceController";
import {NodePastDealsController} from "./Controller/Api/NodePastDealsController";
import {Services} from "./Services";

export class Controllers {

    public nodeController: NodeController;
    public nodeUptimeController: NodeUptimeController;
    public nodeDiskInformationController: NodeDiskInformationController;
    public userController: UserController;
    public generalMinerInfoController: GeneralMinerInfoController;
    public miningRewardsController: MiningRewardsController;
    public nodeBalanceController: NodeBalanceController;
    public nodePastDealsController: NodePastDealsController;

    // controllers initialization
    constructor(services: Services) {
        this.userController = new UserController(services.userService);
        this.nodeController = new NodeController(
            services.nodeService, services.nodeUptimeService, services.nodeDiskInformationService
        );
        this.miningRewardsController = new MiningRewardsController(services.miningRewardsService);
        this.generalMinerInfoController = new GeneralMinerInfoController(services.generalMinerInfoService);
        this.nodeBalanceController = new NodeBalanceController(services.nodeBalanceService);
        this.nodePastDealsController = new NodePastDealsController(services.nodePastDealsService);
        this.nodeDiskInformationController = new NodeDiskInformationController(
            services.nodeDiskInformationService
        );
        this.nodeUptimeController = new NodeUptimeController(
            services.nodeUptimeService, services.nodeUptimeNotificationService
        );
    }
}

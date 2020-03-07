import {NodeLatestDetailsType} from "../Types/NodeLatestDetailsType";
import {NodeService} from "./NodeService";
import {NodeUptimeService} from "./NodeUptimeService";
import {NodeDiskInformationService} from "./NodeDiskInformationService";

export class NodeLatestDetailsService {

    private nodeService: NodeService;
    private nodeUptimeService: NodeUptimeService;
    private nodeDiskInformationService: NodeDiskInformationService


    constructor(
        nodeService: NodeService,
        nodeUptimeService: NodeUptimeService,
        nodeDiskInformationService: NodeDiskInformationService
    ) {
        this.nodeService = nodeService;
        this.nodeUptimeService = nodeUptimeService;
        this.nodeDiskInformationService = nodeDiskInformationService;
    }

    public async getNodesWithLatestDetails(userId: number): Promise<NodeLatestDetailsType[]> {
        const nodes = await this.nodeService.getAllNodes(userId);
        const nodesLatestDetails: NodeLatestDetailsType[] = [];
        for (let i = 0;i<nodes.length;i++) {
            const [latestNodeUptime, latestDiskInfo] = await Promise.all([
                this.nodeUptimeService.fetchLatestNodeUptime(nodes[i].id),
                this.nodeDiskInformationService.fetchLatestDiskInfo(nodes[i].id)
            ]);
            nodesLatestDetails.push({
                node: nodes[i],
                latestUptime: latestNodeUptime,
                latestDiskInformation: latestDiskInfo
            })
        }
        return nodesLatestDetails;
    }
}
import {Node} from "../Models/Node";
import {NodeUptime} from "../Models/NodeUptime";
import {NodeDiskInformation} from "../Models/NodeDiskInformation";

export type NodeLatestDetailsType = {
    node: Node;
    latestUptime: NodeUptime | null;
    latestDiskInformation: NodeDiskInformation | null;
}
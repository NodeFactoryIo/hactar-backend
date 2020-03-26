import {INode} from "../Models/Node";
import {NodeUptime} from "../Models/NodeUptime";
import {NodeDiskInformation} from "../Models/NodeDiskInformation";

export interface INodeLatestDetails extends INode {
    latestUptime: NodeUptime | null;
    latestDiskInformation: NodeDiskInformation | null;
}

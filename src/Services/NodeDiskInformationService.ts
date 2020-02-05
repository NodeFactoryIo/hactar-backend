import {NodeDiskInformation} from "../Models/NodeDiskInformation";

export class NodeDiskInformationService {

    public async createDiskData(freeSpace: string, takenSpace: string, nodeId: number) {
        return await NodeDiskInformation.create({
            freeSpace,
            takenSpace,
            nodeId
        });
    }

    public async fetchDiskInfo(nodeId: number) {
        return await NodeDiskInformation.findAll({
            raw: true,
            where: {
                nodeId
            }
        });
    }
}

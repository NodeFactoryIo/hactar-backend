import {DiskInformation} from "../Models/DiskInformation";

export class DiskInformationService {

    public async createDiskData(freeSpace: number, takenSpace: number, nodeId: number) {
        return await DiskInformation.create({
            freeSpace,
            takenSpace,
            nodeId
        });
    }
}

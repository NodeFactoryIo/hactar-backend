import {NodeGeneralInfo} from "../Models/NodeGeneralInfo";

export class NodeGeneralInfoService {

    public async updateOrCreateNodeGeneralInfo(
        version: string, sectorSize: number, minerPower: number, totalPower: number, nodeId: number) {
        const node = this.fetchNodeGeneralInfo(nodeId);
        if (node) {
            const updatedNode = await NodeGeneralInfo.update({version, sectorSize, minerPower, totalPower, nodeId},
                {
                    where: {
                        nodeId
                    },
                    returning: true,
                })
            return await updatedNode[1]; // returns the updated object, without updates count
        }
        return await NodeGeneralInfo.create({version, sectorSize, minerPower, totalPower, nodeId});
    }

    public async fetchNodeGeneralInfo(nodeId: number) {
        return await NodeGeneralInfo.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
    }
}

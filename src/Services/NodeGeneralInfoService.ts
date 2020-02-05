import {NodeGeneralInfo} from "../Models/NodeGeneralInfo";

export class NodeGeneralInfoService {

    public async updateOrCreateNodeGeneralInfo(
        version: string, sectorSize: string, minerPower: string, totalPower: string, nodeId: number) {
        const node = await this.fetchNodeGeneralInfo(nodeId);
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

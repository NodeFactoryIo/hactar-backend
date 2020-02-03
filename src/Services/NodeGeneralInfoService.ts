import {NodeGeneralInfo} from "../Models/NodeGeneralInfo";

export class NodeGeneralInfoService {

    public async updateOrCreateNodeGenralInfo(
        version: string, sectorSize: number, minerPower: number, totalPower: number, nodeId: number) {
        const node = await NodeGeneralInfo.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
        if (node) {
            const updatedNode = await NodeGeneralInfo.update({version, sectorSize, minerPower, totalPower, nodeId},
                {
                    where: {
                        nodeId
                    },
                    returning: true,
                })
            return await updatedNode[1]; // refturns the updated object, without updates count
        }
        return await NodeGeneralInfo.create({version, sectorSize, minerPower, totalPower, nodeId});
    }

    public async fetchNodeGenralInfo(nodeId: number) {
        return await NodeGeneralInfo.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
    }
}

import {GeneralMinerInfo} from "../Models/GeneralMinerInfo";

export class GeneralMinerInfoService {

    public async updateOrCreateGeneralMinerInfo(
        version: string, sectorSize: string, minerPower: string, totalPower: string, nodeId: number) {
        const node = await this.fetchGeneralMinerInfo(nodeId);
        if (node) {
            const updatedNode = await GeneralMinerInfo.update({version, sectorSize, minerPower, totalPower, nodeId},
                {
                    where: {
                        nodeId
                    },
                    returning: true,
                })
            return await updatedNode[1]; // returns the updated object, without updates count
        }
        return await GeneralMinerInfo.create({version, sectorSize, minerPower, totalPower, nodeId});
    }

    public async fetchGeneralMinerInfo(nodeId: number) {
        return await GeneralMinerInfo.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
    }
}

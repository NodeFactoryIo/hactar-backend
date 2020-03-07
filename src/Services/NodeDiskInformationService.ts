import * as moment from "moment";
import {unitOfTime} from "moment";
import {Op} from "sequelize";
import {NodeDiskInformation} from "../Models/NodeDiskInformation";

export class NodeDiskInformationService {

    public async createDiskData(freeSpace: string, takenSpace: string, nodeId: number) {
        return await NodeDiskInformation.create({
            freeSpace,
            takenSpace,
            nodeId
        });
    }

    public async fetchDiskInfo(nodeId: number, filter: string) {
        return await NodeDiskInformation.findAll({
            raw: true,
            where: {
                nodeId,
                updatedAt: {
                    [Op.gte]:
                        moment.utc().subtract(1, filter as unitOfTime.Base).format("YYYY-MM-DD HH:MM:ssZZ")
                }
            },
            order: [['updatedAt', 'DESC']]
        });
    }

    public async fetchLatestDiskInfo(nodeId: number): Promise<NodeDiskInformation|null> {
        return await NodeDiskInformation.findOne({
            raw: true,
            where: {
                nodeId,
            },
            order: [['updatedAt', 'DESC']]
        })
    }
}

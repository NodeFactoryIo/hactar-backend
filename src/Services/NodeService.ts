import {Node} from "../Models/Node";
import {ServiceError} from "./ServiceError";

export class NodeService {

    public async createNode(url: string, token: string, address: string, userId: number) {
        return await Node.create({url, token, address, userId});
    }

    public async addNodeAdditionalInfo(name: string, description: string, nodeId: number) {
        const node = await this.getNodeByPk(nodeId);
        if (node) {
            const updatedNode = await Node.update({name, description},
                {
                    where: {
                        id: nodeId
                    },
                    returning: true,
                })
            return await updatedNode[1][0]; // returns the updated object, without updates count
        }
        throw new ServiceError(404, "Node not found.");
    }

    public async deleteNode(nodeId: number) {
        return await Node.destroy({
            where: {id: nodeId}
        });
    }

    public async getNodeByPk(nodeId: number) {
        return await Node.findByPk(nodeId);
    }

    public async getNodeWithUserByPk(nodeId: number) {
        return await Node.findByPk(nodeId, {
            include: [
                {}
            ]
        })
    }

    public static async getNodeByData(url: string, address: string) {
        return await Node.findOne({
            raw: true,
            where: {
                url,
                address
            }
        })
    }

    public async getAllNodes(userId: number) {
        return await Node.findAll({
            raw: true,
            where: {
                userId
            }
        })
    }
}

exports.getNodeByData;

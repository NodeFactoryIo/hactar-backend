import {Node} from "../Models/Node";

export class NodeService {

    public async createNode(url: string, token: string, address: string, userId: number) {
        return await Node.create({url, token, address, userId});
    }

    public async deleteNode(nodeId: number) {
        return await Node.destroy({
            where: {id: nodeId}
        });
    }

    public async getNodeByPk(nodeId: number) {
        return await Node.findByPk(nodeId);
    }

    public static async getNodeByData(url: string, address: string) {
        return await Node.findOne({
            raw: true,
            where: {
                url: url,
                address: address
            }
        })
    }

    public static async getAllNodes(userId: number) {
        return await Node.findAll({
            raw: true,
            where: {
                userId
            }
        })
    }
}

exports.getNodeByData;

import { Node } from "../Models/Node";

export class NodeService {

    public async createNode(url: string, token: string, address: string) {
        return await Node.create({ url, token, address });
    }
}

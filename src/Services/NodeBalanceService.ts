import {NodeBalance} from "../Models/NodeBalance";

export class NodeBalanceService {

    public async storeNodeBalance(balance: string, nodeId: number) {
        return await NodeBalance.create({balance, nodeId});
    }
}

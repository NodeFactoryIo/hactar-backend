import BigNumber from 'bignumber.js'
import {NodeBalance} from "../Models/NodeBalance";
import sequelize from "../Services/Database";
import {QueryTypes} from "sequelize";
import {ServiceError} from "./ServiceError";

export class NodeBalanceService {

    public async storeNodeBalance(balance: string, nodeId: number) {
        return await NodeBalance.create({balance, nodeId});
    }

    public async fetchNodeBalance(nodeId: number) {
        const balances = await sequelize.sequelize.query(
            `SELECT *
                FROM "NodeBalance"
                WHERE "nodeId" = 100
                    AND "updatedAt" >= now() - interval '24 hours'
                ORDER BY "updatedAt" ASC`,
            {
                replacements: {nodeId: nodeId},
                type: QueryTypes.SELECT
            }
        ) as Array<NodeBalance>;
        if (balances.length > 0) {
            const earliestRecord = new BigNumber(balances[0]['balance']);
            const latestRecord = new BigNumber(balances[balances.length - 1]['balance']);
            return {
                currentBalance: latestRecord,
                balanceChangePerc: (latestRecord.minus(earliestRecord))
                    .div(earliestRecord).multipliedBy(100).toFixed(2) + '%'
            }
        }
        throw new ServiceError(404, "No balance found.")
    }
}

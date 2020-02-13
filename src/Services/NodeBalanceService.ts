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
            `(SELECT *
                FROM "NodeBalance"
                WHERE "nodeId" = 100
                    AND "updatedAt" >= now() - interval '24 hours'
                ORDER BY "updatedAt" DESC
                LIMIT 1)
                UNION ALL (
                SELECT *
                FROM "NodeBalance"
                WHERE "nodeId" = 100
                    AND "updatedAt" >= now() - interval '24 hours'
                ORDER BY "updatedAt" ASC
                LIMIT 1);`,
            {
                replacements: {nodeId: nodeId},
                type: QueryTypes.SELECT
            }
        ) as Array<NodeBalance>;
        if (balances.length > 0) {
            const earliestRecord = balances[0]['balance'] as unknown as bigint;
            const latestRecord = balances[1]['balance'] as unknown as bigint;
            return {
                currentBalance: latestRecord,
                balanceChangePerc: (((latestRecord - earliestRecord) /
                    earliestRecord as unknown as number) * 100).toFixed(2) + '%'
            }
        }
        throw new ServiceError(404, "No balance found.")
    }
}

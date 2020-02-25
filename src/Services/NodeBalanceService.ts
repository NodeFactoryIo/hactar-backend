import BigNumber from 'bignumber.js'
import * as moment from "moment"
import {Op} from "sequelize";
import {NodeBalance} from "../Models/NodeBalance";
import {ServiceError} from "./ServiceError";

export class NodeBalanceService {

    public async storeNodeBalance(balance: string, nodeId: number) {
        return await NodeBalance.create({balance, nodeId});
    }

    public async fetchNodeBalance(nodeId: number) {
        const balances = await NodeBalance.findAll({
            raw: true,
            where: {
                nodeId,
                updatedAt: {
                    [Op.gte]:
                        moment.utc().subtract(24, "hours").format("YYYY-MM-DD HH:MM:ssZZ")
                }
            },
            order: [['updatedAt', 'ASC']]
        });
        if (balances.length > 0) {
            const earliestRecord = new BigNumber(balances[0].balance);
            const latestRecord = new BigNumber(balances[balances.length - 1].balance);
            return {
                currentBalance: latestRecord,
                updatedAt: balances[balances.length - 1].updatedAt,
                balanceChange: earliestRecord.minus(latestRecord),
                balanceChangePerc: (latestRecord.minus(earliestRecord))
                    .div(earliestRecord).multipliedBy(100).toFixed(2) + '%'
            }
        } else {
            return {
                currentBalance: 0
            }
        }
    }
}

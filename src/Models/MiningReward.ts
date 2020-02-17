import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class MiningReward extends Model {

    private cid: string;
    private rewardAmount: string;
    private nodeId: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
                cid: {
                    type: DataTypes.STRING(),
                    allowNull: false,
                },
                rewardAmount: {
                    type: DataTypes.STRING(),
                    allowNull: false,
                },
            } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "MiningRewards",
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasMany(MiningReward, {foreignKey: "nodeId"});
    }
}

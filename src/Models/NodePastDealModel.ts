import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export interface NodePastDeal {
    cid: string;
    state: number;
    size: string;
    provider: string;
    price: string;
    duration: number;
    nodeId: number;
}


export class NodePastDealModel extends Model implements NodePastDeal  {

    cid: string;
    state: number;
    size: string;
    provider: string;
    price: string;
    duration: number;
    nodeId: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
            cid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            provider: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodePastDeals",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasOne(NodePastDealModel, {foreignKey: "nodeId"});
    }
}

import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodePastDeal extends Model {

    private cid: string;
    private state: number;
    private size: string;
    private provider: string;
    private price: string;
    private duration: string;
    private nodeId: number;

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
        Node.hasOne(NodePastDeal, {foreignKey: "nodeId"});
    }
}

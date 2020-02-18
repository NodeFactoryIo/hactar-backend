import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodeStatus extends Model {

    public nodeId: number;
    public isUp: boolean;
    public isReported: boolean;

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                isUp: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                isReported: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodeStatus",
                freezeTableName: true
            } as InitOptions
        );
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasOne(NodeStatus, {foreignKey: "nodeId"});
    }
}
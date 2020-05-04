import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodeUptime extends Model {

    public id: number;
    public isWorking: boolean;
    public nodeId: number;

    // Virtual property returned from query
    public foundDown?: boolean;

    public static initialize(sequelize: Sequelize) {
        this.init({
            isWorking: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodeUptime",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasMany(NodeUptime, {foreignKey: "nodeId"});
    }
}

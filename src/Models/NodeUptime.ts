import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "../Models/Node";

export class NodeUptime extends Model {

    private isWorking: boolean;

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

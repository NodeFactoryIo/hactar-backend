import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodeBalance extends Model {

    public balance: string;
    public updatedAt: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            balance: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodeBalance",
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasMany(NodeBalance, {foreignKey: "nodeId"});
    }
}

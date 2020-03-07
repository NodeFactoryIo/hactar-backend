import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodeDiskInformation extends Model {

    public freeSpace: string;
    public takenSpace: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            freeSpace: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            takenSpace: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodeDiskInformation",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasMany(NodeDiskInformation, {foreignKey: "nodeId"});
    }
}

import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodeDiskInformation extends Model {

    private freeSpace: number;
    private takenSpace: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
            freeSpace: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            takenSpace: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodeDiskInformation",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
    }
}

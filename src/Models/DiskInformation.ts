import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "../Models/Node";

export class DiskInformation extends Model {

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
                tableName: "DiskInformation",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
    }
}

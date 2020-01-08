import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "../Models/Node";

export class DiskInformation extends Model {

    private freeSpace: number;
    private takenSpace: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
            freeSpace: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            takenSpace: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "DiskInformations",
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});

    }
}

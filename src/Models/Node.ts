import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";

export class Node extends Model {

    private url: string;
    private token: string;
    private address: string;
    private diskInformationId: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
            url: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "Nodes",
            } as InitOptions);
    }
}

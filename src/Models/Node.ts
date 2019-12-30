import { Model, InitOptions, ModelAttributes, DataTypes, Sequelize } from "sequelize";

export class Node extends Model {

    private url: string;
    private token: string;
    private address: string;
    private updatedAt: Date;
    private createdAt: Date;

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
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: null,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: () => new Date(),
                allowNull: false
            }
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "Nodes",
            } as InitOptions);
    }
}

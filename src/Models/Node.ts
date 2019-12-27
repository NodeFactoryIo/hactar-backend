import { Model, InitOptions, ModelAttributes, DataTypes, Sequelize, NOW } from "sequelize";

export class Node extends Model {

    // private id: number;
    private url: string;
    private token: string;
    private address: string;
    private updatedAt: Date;
    private createdAt: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            // id: {
            //     type: DataTypes.NUMBER,
            //     primaryKey: true,
            //     allowNull: false,
            // },
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

import { Model, InitOptions, ModelAttributes, DataTypes, Sequelize } from "sequelize";

export class Node extends Model {
    // to do add ID, updatedAt, createdAt

    private url: string;
    private token: string;
    private address: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            // to do add ID, updatedAt, createdAt
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

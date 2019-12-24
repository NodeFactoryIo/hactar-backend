import { Model, InitOptions, ModelAttributes, DataTypes, Sequelize } from "sequelize";

export default class Example extends Model {
    public help!: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            help: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "Examples",
            } as InitOptions);
    }
}

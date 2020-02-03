import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";

export class User extends Model {

    public id: number;
    public email: string;
    public hash_password: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            email: {
                type: DataTypes.STRING(),
                allowNull: false,
                unique: true,
            },
            // eslint-disable-next-line
            hash_password: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "Users",
            } as InitOptions);
    }
}

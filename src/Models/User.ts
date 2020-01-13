import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";

export class User extends Model {

    private email: string;
    private hashPassword: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
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

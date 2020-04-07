import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";

export interface User {
    id: number;
    email: string;
    hash_password: string;

}
export class UserModel extends Model implements User {

    id: number;
    email: string;
    hash_password: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            // eslint-disable-next-line
            hash_password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "Users",
            } as InitOptions);
    }
}

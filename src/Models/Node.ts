import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {User} from "../Models/User";

export class Node extends Model {

    private url: string;
    private token: string;
    private address: string;

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
        this.belongsTo(User, {foreignKey: "userId"});
        User.hasMany(Node, {foreignKey: "userId"});
    }
}

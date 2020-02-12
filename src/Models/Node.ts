import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {User} from "../Models/User";

export class Node extends Model {

    public id: number;
    private url: string;
    private token: string;
    private address: string;
    private userId: number;
    private name: string;
    private description: string;

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
            name: {
                type: DataTypes.STRING(),
                allowNull: true
            },
            description: {
                type: DataTypes.STRING(),
                allowNull: true
            }
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "Nodes",
            } as InitOptions);
        this.belongsTo(User, {foreignKey: "userId"});
        User.hasMany(Node, {foreignKey: "userId"});
    }
}

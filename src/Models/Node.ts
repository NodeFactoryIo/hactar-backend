import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {User} from "./User";

export class Node extends Model {

    public id: number;
    public url: string;
    public token: string;
    public address: string;
    public userId: number;
    public name: string;
    public description: string;

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
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
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

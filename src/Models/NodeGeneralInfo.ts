import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class NodeGeneralInfo extends Model {

    private version: string;
    private sectorSize: string;
    private minerPower: string;
    private totalPower: string;
    private nodeId: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
                version: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                },
                sectorSize: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                minerPower: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                totalPower: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "NodeGeneralInfo",
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasOne(NodeGeneralInfo, {foreignKey: "nodeId"});
    }
}

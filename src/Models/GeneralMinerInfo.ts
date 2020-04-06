import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";

export class GeneralMinerInfo extends Model {

    private version: string;
    private walletAddress: string;
    private sectorSize: string;
    private numberOfSectors: number;
    private minerPower: string;
    private totalPower: string;
    private nodeId: number;

    public static initialize(sequelize: Sequelize) {
        this.init({
            version: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            walletAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sectorSize: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            numberOfSectors: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            minerPower: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            totalPower: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "GeneralMinerInfo",
            } as InitOptions);
        this.belongsTo(Node, {foreignKey: "nodeId"});
        Node.hasOne(GeneralMinerInfo, {foreignKey: "nodeId"});
    }
}

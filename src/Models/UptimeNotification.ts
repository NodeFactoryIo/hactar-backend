import {DataTypes, InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {NodeUptime} from "./NodeUptime";

export class UptimeNotification extends Model {

    public id: number;
    public nodeUptimeId: number;
    public notificationSent: boolean;

    public static initialize(sequelize: Sequelize) {
        this.init({
                notificationSent: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            } as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "UptimeNotifications",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(NodeUptime, {foreignKey: "nodeUptimeId"});
        NodeUptime.hasOne(UptimeNotification, {foreignKey: "nodeUptimeId"});
    }
}
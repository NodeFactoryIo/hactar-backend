import {InitOptions, Model, ModelAttributes, Sequelize} from "sequelize";
import {Node} from "./Node";
import {NodeUptime} from "./NodeUptime";

export class UptimeNotification extends Model {

    private nodeUptimeId: number;

    public static initialize(sequelize: Sequelize) {
        this.init({} as ModelAttributes,
            {
                sequelize: sequelize,
                tableName: "UptimeNotifications",
                freezeTableName: true,
            } as InitOptions);
        this.belongsTo(NodeUptime, {foreignKey: "nodeUptimeId"});
        Node.hasMany(UptimeNotification, {foreignKey: "nodeUptimeId"});
    }
}
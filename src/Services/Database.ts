import path from "path";
import {Options, QueryOptionsWithType, QueryTypes, Sequelize} from "sequelize";
import Umzug from "umzug";
import {Umzug as UmzugInterface} from "umzug";

import config from "../Config/Config";
import logger from "../Services/Logger";
import {Node} from "../Models/Node";
import {NodeDiskInformation} from "../Models/NodeDiskInformation";
import {NodeUptime} from "../Models/NodeUptime";
import {UserModel} from "../Models/UserModel";
import {GeneralMinerInfo} from "../Models/GeneralMinerInfo";
import {MiningReward} from "../Models/MiningReward";
import {NodeBalance} from "../Models/NodeBalance";
import {NodeStatus} from "../Models/NodeStatus";
import {NodePastDealModel} from "../Models/NodePastDealModel";

export class Database {

    public sequelize: Sequelize;

    private migrations: UmzugInterface;

    constructor() {
        this.sequelize = new Sequelize(
            {
                database: config.db.database,
                username: config.db.user,
                password: config.db.password,
                dialect: config.db.dialect,
                host: config.db.host,
                logging: sql => logger.debug(sql),
                native: false,
                pool: {
                    acquire: 30000,
                    idle: 10000,
                    max: 5,
                    min: 0,
                },
                modelPaths: [path.join(__dirname, "../Models")],
            } as Options,
        );
        this.initModels();
        this.migrations = new Umzug({
            storage: "sequelize",

            storageOptions: {
                sequelize: this.sequelize,
            },

            migrations: {
                params: [
                    this.sequelize.getQueryInterface(),
                    Sequelize,
                ],
                path: path.join(__dirname, "../Migrations"),
            },
        });
    }

    public async init(): Promise<Sequelize> {
        await this.waitForDb();
        await this.runMigrations();
        return this.sequelize;
    }

    public async runQuery<T extends object>(
        query: string,
        options: QueryOptionsWithType<QueryTypes.SELECT>
    ): Promise<T[]> {
        return this.sequelize.query<T>(query, options);
    }

    private async waitForDb(): Promise<void> {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            try {
                logger.info(`Connecting to database at ${config.db.host}:3306`);
                await this.sequelize.authenticate();
                logger.info("Database connection has been established successfully.");
                break;
            } catch (e) {
                logger.error("Unable to connect to the database:", e);
                logger.info("Retrying in 3s...");
                await this.sleep(3000);
            }
        }
    }

    private async runMigrations(): Promise<void> {
        // Run migrations if not testing
        if (config.env !== "test") {
            try {
                logger.info("Running migrations...");
                const doneMigrations = await this.migrations.up();
                logger.info(`${doneMigrations.length} migrations executed successfully`);
            } catch (err) {
                logger.error('Error while trying to run migrations');
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    private initModels(): void {
        UserModel.initialize(this.sequelize);
        Node.initialize(this.sequelize);
        NodeDiskInformation.initialize(this.sequelize);
        NodeUptime.initialize(this.sequelize);
        GeneralMinerInfo.initialize(this.sequelize);
        MiningReward.initialize(this.sequelize);
        NodeBalance.initialize(this.sequelize);
        NodePastDealModel.initialize(this.sequelize);
        NodeStatus.initialize(this.sequelize);
    }
}

export default new Database();

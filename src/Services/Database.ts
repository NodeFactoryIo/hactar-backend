import path from "path";
import { Options, Sequelize } from "sequelize";
import Umzug from "umzug";
import { Umzug as UmzugInterface } from "umzug";

import config from "../Config/Config";
import { Node } from "../Models/Node";
import logger from "../Services/Logger";

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
                console.log('error', err)
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    private initModels(): void {
        Node.initialize(this.sequelize);
    }
}

export default new Database();
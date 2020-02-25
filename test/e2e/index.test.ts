import {after, before} from "mocha";
import {App} from "../../src/App";
import database from "../../src/Services/Database";
import logger from "../../src/Services/Logger";

export const app: App = new App();

before(async function () {
    this.timeout(10000);
    logger.silent = false;
    await database.init();
    await app.start();
    await database.sequelize.sync({force: true});
});

after(async function () {
    this.timeout(10000);
    await app.stop();
    logger.silent = true;
});
